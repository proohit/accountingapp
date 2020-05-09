import { con } from '../../database/database';
import Record from './Record';

export const all = async () => {
  try {
    const data = await con.query<Record[]>('SELECT * FROM Record;');
    return data;
  } catch (error) {
    throw error;
  }
};

export const allByUser = async (username: string): Promise<Record[]> => {
  try {
    const recordsOfUser = await con.query<Record[]>(
      `SELECT * FROM Record WHERE owner='${username}';`
    );

    return recordsOfUser[0];
  } catch (error) {
    throw error;
  }
};

export const byWallet = async (username: string, wallet: string) => {
  try {
    let records = await con.query<Record[]>(
      `SELECT * FROM Record WHERE owner='${username}' AND walletName='${wallet}'`
    );
    return records[0];
  } catch (err) {
    throw err;
  }
};

export const byId = async (id: number) => {
  try {
    if (!id) {
      throw new Error('no id provided!');
    }
    const createdRecord = await con.query<Record[]>(
      `SELECT * FROM Record WHERE id=${id}`
    );
    return createdRecord[0][0];
  } catch (error) {
    throw error;
  }
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
  owner: string
) => {
  try {
    const result = (await con.query(
      `INSERT INTO Record(description, value, walletName,timestamp, owner) VALUES ('${description}',${value},'${wallet}','${timestamp}','${owner}')`
    )) as any;
    const insertedRecord = await byId(result[0].insertId);
    return insertedRecord;
  } catch (error) {
    throw error;
  }
};

/**
 * expects an id as parameter. This id will be deleted from the database
 */
export const deleteRecord = async (id: number) => {
  try {
    if (!id) {
      throw new Error('no id provided!');
    }
    const response = await con.query(`DELETE FROM Record WHERE id=${id}`);
    return `deleted record with id ${id}`;
  } catch (error) {
    throw error;
  }
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
  owner: string
) => {
  try {
    let sql = `UPDATE Record SET id=${id}`;
    if (description) sql += `, description='${description}'`;
    if (value) sql += `, value=${value}`;
    if (walletName === null) sql += `, walletName=${walletName}`;
    else if (walletName) sql += `, walletName='${walletName}'`;
    if (owner) sql += `, owner='${owner}'`;
    if (timestamp) sql += `, timestamp='${timestamp}'`;

    sql += ` WHERE id = ${id}`;
    const res = await con.query(sql);
    const updatedRecord = await byId(id);
    return updatedRecord;
  } catch (error) {
    throw error;
  }
};

export const createTable = async () => {
  try {
    let sql = `CREATE TABLE \`Record\` (
            \`id\` int(11) NOT NULL,
            \`description\` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
            \`value\` double NOT NULL,
            \`timestamp\` datetime NOT NULL,
            \`walletName\` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            \`owner\` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
    const res = await con.query(sql);
  } catch (error) {}
};

export const createIndices = async () => {
  try {
    const sql = `ALTER TABLE \`Record\`
      ADD PRIMARY KEY (\`id\`),
      ADD KEY \`FK_Record_User\` (\`owner\`),
      ADD KEY \`FK_Record_Wallet\` (\`walletName\`,\`owner\`);`;
    const res = await con.query(sql);
  } catch (error) {}
};

export const createAutoIncrement = async () => {
  try {
    const sql = `ALTER TABLE \`Record\`
        MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;`;
    const res = await con.query(sql);
  } catch (error) {}
};

export const createConstraints = async () => {
  try {
    const sql = `ALTER TABLE \`Record\`
    ADD CONSTRAINT \`FK_Record_User\` FOREIGN KEY (\`owner\`) REFERENCES \`User\` (\`username\`),
    ADD CONSTRAINT \`FK_Record_Wallet\` FOREIGN KEY (\`walletName\`,\`owner\`) REFERENCES \`Wallet\` (\`name\`, \`owner\`);`;
    const res = await con.query(sql);
  } catch (error) {}
};
