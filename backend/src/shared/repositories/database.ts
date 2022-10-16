import { Category } from '../../entity/Category';
import { DashboardSettings } from '../../entity/DashboardSettings';
import { Record } from '../../entity/Record';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';
import dataSource from './dataSource';

export const repositories = {
    records: () => dataSource.getRepository(Record),
    wallets: () => dataSource.getRepository(Wallet),
    categories: () => dataSource.getRepository(Category),
    users: () => dataSource.getRepository(User),
    recurrentRecords: () => dataSource.getRepository(RecurrentRecord),
    settings: () => dataSource.getRepository(DashboardSettings),
};
