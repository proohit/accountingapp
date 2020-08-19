import mysql, { RowDataPacket } from 'mysql2';
import config from '../../../config';
import RECORD_MAPPER from '../../record/repositories/RecordMapper';
import { createTable as createUserTable, resetTable as resetUserTable } from '../../user/repositories/UserMapper';
import {
    createConstraints as createWalletConstraints,
    createIndices as createWalletIndices,
    createTable as createWalletTable,
    resetTable as resetWalletTable,
} from '../../wallet/repositories/WalletMapper';
import logger from '../services/loggingService';

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
    await RECORD_MAPPER.createTable();
    await createUserTable();
    await createWalletTable();
    await RECORD_MAPPER.createIndices();
    await createWalletIndices();
    await RECORD_MAPPER.createAutoIncrement();
    await RECORD_MAPPER.createConstraints();
    await createWalletConstraints();
};

export const resetTables = async () => {
    await resetWalletTable();
    await resetUserTable();
    await RECORD_MAPPER.resetTable();
};

export const setupDatabase = async () => {
    logger.log('info', 'Resetting tables...');
    await resetTables();
    logger.log('info', 'Settigng up tables...');
    await setupTables();
    logger.log('info', 'Successfully setup tables!');
};

export const checkAndSetupDatabase = async (): Promise<void> => {
    const needsSetup = await checkIfNeedsSetup();
    if (!needsSetup) {
        logger.log('info', `Database correctly setup`);
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
        logger.log('debug', `Table ${shouldTable} setup?: ${!isMissing}`);
        return isMissing;
    });
    return needsSetup;
};
