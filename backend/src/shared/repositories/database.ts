import { createConnection, getCustomRepository, getRepository } from 'typeorm';
import { RecordRepository } from '../../record/repositories/RecordRepository';
import { User } from '../../entity/User';
import { CategoryRepository } from '../../category/repositories/CategoryRepository';
import { WalletRepository } from '../../wallet/repositories/WalletRepository';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { DashboardSettings } from '../../entity/DashboardSettings';

export const connection = createConnection();

export const repositories = {
    records: () => getCustomRepository(RecordRepository),
    wallets: () => getCustomRepository(WalletRepository),
    categories: () => getCustomRepository(CategoryRepository),
    users: () => getRepository(User),
    recurrentRecords: () => getRepository(RecurrentRecord),
    settings: () => getRepository(DashboardSettings),
};
