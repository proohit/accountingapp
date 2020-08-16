import { pool } from '../../shared/repositories/database';
import { RecordNotFound } from '../models/Errors';
import Record from '../models/Record';
import { convertJSDateToMySQLDate } from '../../shared/utils/dateUtils';
import { MessageResult } from '../../shared/models/RouteResult';

export const all = async (): Promise<Record[]> => {
    const [records] = await pool.query<Record[]>('SELECT * FROM Record;');
    return records;
};

export const byUser = async (username: string, from: number, count: number): Promise<Record[]> => {
    const [recordsOfUser] = await pool.query<Record[]>(
        `SELECT * FROM Record WHERE owner='${username}' ORDER BY timestamp DESC LIMIT ${from},${count};`,
    );

    return recordsOfUser;
};

export const byWallet = async (username: string, wallet: string): Promise<Record[]> => {
    const [records] = await pool.query<Record[]>(
        `SELECT * FROM Record WHERE owner='${username}' AND walletName='${wallet}'`,
    );
    return records.map((record) => ({ ...record, timestamp: convertJSDateToMySQLDate(new Date(record.timestamp)) }));
};

export const byId = async (id: number): Promise<Record> => {
    const [records] = await pool.query<Record[]>(`SELECT * FROM Record WHERE id=${id}`);
    if (records.length <= 0) throw new RecordNotFound();
    return records[0];
};

/**
 * creates a record. Parameters are necessary: description (description for the record), value (the value for the record, negative will reduce wallet balance), wallet (in which this record is cretided), owner (the user that this record belong to)
 * @param {string} description
 * @param {number} value
 * @param {string} wallet
 * @param {object} timestamp
 * @param {string} owner
 */
export const createRecord = async (
    description: string,
    value: number,
    wallet: string,
    timestamp: string,
    owner: string,
): Promise<Record> => {
    const result = (await pool.query(
        `INSERT INTO Record(description, value, walletName,timestamp, owner) VALUES ('${description}',${value},'${wallet}','${timestamp}','${owner}')`,
    )) as any;
    const insertedRecord = await byId(result[0].insertId);
    return insertedRecord;
};

/**
 * expects an id as parameter. This id will be deleted from the database
 */
export const deleteRecord = async (id: number): Promise<MessageResult> => {
    await pool.query(`DELETE FROM Record WHERE id=${id}`);
    return { message: `Deleted Record with id '${id}'` };
};

/**
 *
 */
export const update = async (
    id: number,
    description: string,
    value: number,
    walletName: string,
    timestamp: string,
    owner: string,
): Promise<Record> => {
    let sql = `UPDATE Record SET id=${id}`;
    if (description) sql += `, description='${description}'`;
    if (value) sql += `, value=${value}`;
    if (walletName === null) sql += `, walletName=${walletName}`;
    else if (walletName) sql += `, walletName='${walletName}'`;
    if (owner) sql += `, owner='${owner}'`;
    if (timestamp) sql += `, timestamp='${timestamp}'`;

    sql += ` WHERE id = ${id}`;
    await pool.query(sql);
    const updatedRecord = await byId(id);
    return updatedRecord;
};

export const createTable = async (): Promise<void> => {
    const sql = `CREATE TABLE \`Record\` (
            \`id\` int(11) NOT NULL,
            \`description\` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`value\` double NOT NULL,
            \`timestamp\` datetime NOT NULL,
            \`walletName\` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
    await pool.query(sql);
};

export const createIndices = async (): Promise<void> => {
    const sql = `ALTER TABLE \`Record\`
      ADD PRIMARY KEY (\`id\`),
      ADD KEY \`FK_Record_User\` (\`owner\`),
      ADD KEY \`FK_Record_Wallet\` (\`walletName\`,\`owner\`);`;
    await pool.query(sql);
};

export const createAutoIncrement = async (): Promise<void> => {
    const sql = `ALTER TABLE \`Record\`
        MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;`;
    await pool.query(sql);
};

export const createConstraints = async (): Promise<void> => {
    const sql = `ALTER TABLE \`Record\`
    ADD CONSTRAINT \`FK_Record_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`),
    ADD CONSTRAINT \`FK_Record_Wallet\` FOREIGN KEY (\`walletName\`,\`owner\`) REFERENCES \`Wallet\` (\`name\`, \`owner\`);`;
    await pool.query(sql);
};
