import { createTable as createRecordTable } from '../../record/repositories/RecordMapper';
import { createIndices as createRecordIndices } from '../../record/repositories/RecordMapper';
import { createAutoIncrement as createRecordAutoIncrement } from '../../record/repositories/RecordMapper';
import { createConstraints as createRecordConstraints } from '../../record/repositories/RecordMapper';
import { createTable as createUserTable, byName } from '../../user/repositories/UserMapper';
import { createIndices as createUserIndices } from '../../user/repositories/UserMapper';
import { createTable as createWalletTable } from '../../wallet/repositories/WalletMapper';
import { createIndices as createWalletIndices } from '../../wallet/repositories/WalletMapper';
import { createConstraints as createWalletConstraints } from '../../wallet/repositories/WalletMapper';
import mysql, { RowDataPacket } from 'mysql2';
import FullUser from '../../user/models/User';
import config from '../../../config';

export const con = mysql
    .createConnection({
        host: config.host,
        port: 3306,
        user: config.user,
        password: config.password,
        database: config.database,
    })
    .promise();

export const initiateDatabase = async () => {
    await createRecordTable();
    await createUserTable();
    await createWalletTable();
    await createUserIndices();
    await createRecordIndices();
    await createWalletIndices();
    await createRecordAutoIncrement();
    await createRecordConstraints();
    await createWalletConstraints();
};

export const useDatabase = async (databaseName: string) => {
    try {
        const res = await con.query(`USE DATABASE ${databaseName};`);
    } catch (error) {}
};

export const close = () => {
    con.end();
};
