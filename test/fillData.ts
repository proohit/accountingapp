import { createConnection } from 'typeorm';
import { register } from '../src/shared/repositories/authenticationMapper';
import { services } from '../src/shared/services/services';

const username = 'direnc';

const createUser = async () => {
    const user = await register(username, 'test123');
    console.log('created', user);
    return user;
};

const createWallet = async () => {
    const createdWallet = await services.walletService.createWallet('Konto', 0, username);
    console.log('created', createdWallet);
    return createdWallet;
};

const createRecords = async (walletId: string, categoryId: string) => {
    for (let i = 1; i < 1000; i++) {
        const record = await services.recordService.createRecord(
            `Test record nr. ${i}`,
            12,
            new Date(2020, 12, i, 11, 12, 0),
            walletId,
            categoryId,
            username,
        );
        console.log('created', record);
    }
};

const createCategory = async () => {
    const category = await services.categoryService.createCategory('other', username);
    console.log('created', category);
    return category;
};

const createAllData = async () => {
    await createConnection();
    await createUser();
    const wallet = await createWallet();
    const category = await createCategory();
    await createRecords(wallet.id, category.id);
};

createAllData();
