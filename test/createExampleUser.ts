import CategoryMapper from '../src/category/repositories/CategoryMapper';
import { register } from '../src/shared/repositories/authenticationMapper';
import WalletMapper from '../src/wallet/repositories/WalletMapper';

const createExampleUser = async () => {
    await register('direnc', 'test');
    await CategoryMapper.create('direnc', 'other');
    await WalletMapper.create('Konto', 0, 'direnc');
};

createExampleUser();
