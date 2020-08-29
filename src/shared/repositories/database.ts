import mysql, { RowDataPacket } from 'mysql2';
import config from '../../../config';
import RECORD_MAPPER from '../../record/repositories/RecordMapper';
import { createTable as createUserTable, resetTable as resetUserTable } from '../../user/repositories/UserMapper';
import WALLET_MAPPER from '../../wallet/repositories/WalletMapper';
import logger from '../services/loggingService';
import CATEGORY_MAPPER from '../../category/repositories/CategoryMapper';

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
    await WALLET_MAPPER.createTable();
    await CATEGORY_MAPPER.createTable();
    await CATEGORY_MAPPER.createIndices();
    await RECORD_MAPPER.createIndices();
    await WALLET_MAPPER.createIndices();
    await RECORD_MAPPER.createAutoIncrement();
    await CATEGORY_MAPPER.createConstraints();
    await RECORD_MAPPER.createConstraints();
    await WALLET_MAPPER.createConstraints();
};

export const resetTables = async () => {
    await RECORD_MAPPER.resetTable();
    await CATEGORY_MAPPER.resetTable();
    await WALLET_MAPPER.resetTable();
    await resetUserTable();
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
