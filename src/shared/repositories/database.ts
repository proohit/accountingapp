import mysql from 'mysql2';
import config from '../../../config';
import {
    createAutoIncrement as createRecordAutoIncrement,
    createConstraints as createRecordConstraints,
    createIndices as createRecordIndices,
    createTable as createRecordTable,
} from '../../record/repositories/RecordMapper';
import { createIndices as createUserIndices, createTable as createUserTable } from '../../user/repositories/UserMapper';
import {
    createConstraints as createWalletConstraints,
    createIndices as createWalletIndices,
    createTable as createWalletTable,
} from '../../wallet/repositories/WalletMapper';

export const con = mysql
    .createConnection({
        host: config.host,
        port: 3306,
        user: config.user,
        password: config.password,
        database: config.database,
    })
    .promise();

export const initiateDatabase = async (): Promise<void> => {
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

export const useDatabase = async (databaseName: string): Promise<void> => {
    try {
        await con.query(`USE DATABASE ${databaseName};`);
    } catch (error) {}
};

export const close = (): void => {
    con.end();
};
