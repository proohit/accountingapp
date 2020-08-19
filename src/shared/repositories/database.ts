import mysql, { RowDataPacket } from 'mysql2';
import config from '../../../config';
import {
    createAutoIncrement as createRecordAutoIncrement,
    createConstraints as createRecordConstraints,
    createIndices as createRecordIndices,
    createTable as createRecordTable,
    resetTable as resetRecordTable,
} from '../../record/repositories/RecordMapper';
import { createTable as createUserTable, resetTable as resetUserTable } from '../../user/repositories/UserMapper';
import {
    createConstraints as createWalletConstraints,
    createIndices as createWalletIndices,
    createTable as createWalletTable,
    resetTable as resetWalletTable,
} from '../../wallet/repositories/WalletMapper';

export const pool = mysql
    .createPool({
        host: config.host,
        port: 3306,
        user: config.user,
        password: config.password,
        database: config.database,
    })
    .promise();

export const setupTables = async (): Promise<void> => {
    await createRecordTable();
    await createUserTable();
    await createWalletTable();
    await createRecordIndices();
    await createWalletIndices();
    await createRecordAutoIncrement();
    await createRecordConstraints();
    await createWalletConstraints();
};

export const resetTables = async () => {
    await resetWalletTable();
    await resetUserTable();
    await resetRecordTable();
};

export const setupDatabase = async () => {
    console.log('Resetting tables...');
    await resetTables();
    console.log('Setting up tables...');
    await setupTables();
    console.log('Successfully setup tables!');
};

export const checkAndSetupDatabase = async (): Promise<void> => {
    const needsSetup = await checkIfNeedsSetup();
    if (!needsSetup) {
        console.log('Database correctly setup');
        return;
    }
    await setupDatabase();
};

export const checkIfNeedsSetup = async (): Promise<boolean> => {
    const [tables] = await pool.query<RowDataPacket[]>('SHOW TABLES;');
    const extractedTableNames = tables.map((table) => table[`Tables_in_${config.database}`]);
    const shouldTables = Object.values(config.tables);
    if (tables.length <= 0) return true;
    const needsSetup = shouldTables.some((shouldTable) => {
        const isMissing = !extractedTableNames.includes(shouldTable);
        console.log(`Is Table ${shouldTable} available?: ${!isMissing}`);
        return isMissing;
    });
    return needsSetup;
};
