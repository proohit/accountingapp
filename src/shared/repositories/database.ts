import { createConnection, getRepository } from 'typeorm';
import { Category } from '../../entity/Category';
import { Record } from '../../entity/Record';
import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';

export const connection = createConnection();

export const repositories = {
    records: () => getRepository(Record),
    wallets: () => getRepository(Wallet),
    categories: () => getRepository(Category),
    users: () => getRepository(User),
};
