import { MessageResult } from '../../shared/models/RouteResult';
import { pool } from '../../shared/repositories/database';
import { convertJSDateToMySQLDate } from '../../shared/utils/dateUtils';
import { RecordNotFound } from '../models/Errors';
import Record from '../models/Record';
import { RecordRepository } from '../models/RecordRepository';
import { SearchQuery } from '../models/SearchQuery';

export const all = async (): Promise<Record[]> => {
    const [records] = await pool.query<Record[]>('SELECT * FROM Record;');
    return records;
};

class RecordMapper implements RecordRepository {
    async getByQuery(username: string, query: SearchQuery): Promise<Record[]> {
        const sortQuery = query.sortBy && query.sortDirection ? `ORDER BY ${query.sortBy} ${query.sortDirection}` : '';
        const limitQuery = query.from && query.to ? `LIMIT ${query.from},${query.to}` : '';
        const finalQuery = `SELECT * FROM Record WHERE owner='${username}' ${sortQuery} ${limitQuery};`;
        const [records] = await pool.query<Record[]>(finalQuery);

        return records.map((record) => ({
            ...record,
            timestamp: convertJSDateToMySQLDate(new Date(record.timestamp)),
        }));
    }

    async getByCategory(username: string, category: string): Promise<Record[]> {
        const [recordsOfUserByCategory] = await pool.query<Record[]>(
            `SELECT * FROM Record WHERE owner='${username}' AND category='${category}' ORDER BY timestamp DESC;`,
        );

        return recordsOfUserByCategory.map((record) => ({
            ...record,
            timestamp: convertJSDateToMySQLDate(new Date(record.timestamp)),
        }));
    }
    async getByUser(username: string, from: number, count: number): Promise<Record[]> {
        const [recordsOfUser] = await pool.query<Record[]>(
            `SELECT * FROM Record WHERE owner='${username}' ORDER BY timestamp DESC LIMIT ${from},${count};`,
        );

        return recordsOfUser.map((record) => ({
            ...record,
            timestamp: convertJSDateToMySQLDate(new Date(record.timestamp)),
        }));
    }
    async getByWallet(username: string, wallet: string): Promise<Record[]> {
        const [records] = await pool.query<Record[]>(
            `SELECT * FROM Record WHERE owner='${username}' AND walletName='${wallet}'`,
        );
        return records.map((record) => ({
            ...record,
            timestamp: convertJSDateToMySQLDate(new Date(record.timestamp)),
        }));
    }

    async getById(id: number): Promise<Record> {
        const [records] = await pool.query<Record[]>(`SELECT * FROM Record WHERE id=${id}`);
        if (records.length <= 0) throw new RecordNotFound();
        return records[0];
    }
    async createRecord(
        description: string,
        value: number,
        wallet: string,
        timestamp: string,
        owner: string,
        category: string,
    ): Promise<Record> {
        const result = (await pool.query(
            `INSERT INTO Record(description, value, walletName,timestamp, owner, category) VALUES ('${description}',${value},'${wallet}','${timestamp}','${owner}', '${category}')`,
        )) as any;
        const insertedRecord = await this.getById(result[0].insertId);
        return insertedRecord;
    }
    async deleteRecord(id: number): Promise<MessageResult> {
        await pool.query(`DELETE FROM Record WHERE id=${id}`);
        return { message: `Deleted Record with id '${id}'` };
    }

    async updateRecord(
        id: number,
        description: string,
        value: number,
        walletName: string,
        timestamp: string,
        owner: string,
        category: string,
    ): Promise<Record> {
        let sql = `UPDATE Record SET id=${id}`;
        if (description) sql += `, description='${description}'`;
        if (value) sql += `, value=${value}`;
        if (walletName === null) sql += `, walletName=${walletName}`;
        else if (walletName) sql += `, walletName='${walletName}'`;
        if (owner) sql += `, owner='${owner}'`;
        if (timestamp) sql += `, timestamp='${timestamp}'`;
        if (category === null) sql += `, category=${category}`;
        else if (category) sql += `, category='${category}'`;

        sql += ` WHERE id = ${id}`;
        await pool.query(sql);
        const updatedRecord = await this.getById(id);
        return updatedRecord;
    }

    async createTable(): Promise<void> {
        const sql = `CREATE TABLE \`Record\` (
                \`id\` int(11) NOT NULL,
                \`description\` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
                \`value\` double NOT NULL,
                \`timestamp\` datetime NOT NULL,
                \`walletName\` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
                \`category\` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
        await pool.query(sql);
    }

    async createIndices(): Promise<void> {
        const sql = `ALTER TABLE \`Record\`
      ADD PRIMARY KEY (\`id\`),
      ADD KEY \`FK_Record_User\` (\`owner\`),
      ADD KEY \`FK_Record_Category\` (\`category\`),
      ADD KEY \`FK_Record_Wallet\` (\`walletName\`,\`owner\`);`;
        await pool.query(sql);
    }

    async createAutoIncrement(): Promise<void> {
        const sql = `ALTER TABLE \`Record\`
        MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;`;
        await pool.query(sql);
    }

    async createConstraints(): Promise<void> {
        const sql = `ALTER TABLE \`Record\`
    ADD CONSTRAINT \`FK_Record_Category\` FOREIGN KEY (\`category\`) REFERENCES \`Category\` (\`name\`),
    ADD CONSTRAINT \`FK_Record_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`),
    ADD CONSTRAINT \`FK_Record_Wallet\` FOREIGN KEY (\`walletName\`,\`owner\`) REFERENCES \`Wallet\` (\`name\`, \`owner\`);`;
        await pool.query(sql);
    }

    async resetTable(): Promise<void> {
        const sql = `DROP TABLE IF EXISTS  \`Record\``;
        await pool.query(sql);
    }
}

const RECORD_MAPPER: RecordRepository = new RecordMapper();
export default RECORD_MAPPER;
