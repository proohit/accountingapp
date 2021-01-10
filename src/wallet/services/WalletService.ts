import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { DuplicateWallet, WalletNotFound } from '../models/Errors';

export default class WalletService {
    async createWallet(name: Wallet['name'], balance: Wallet['balance'], username: User['username']) {
        const missingProperties = [];
        if (!name) {
            missingProperties.push('name');
        }
        if (!balance && balance !== 0) {
            missingProperties.push('balance');
        }

        if (missingProperties.length) {
            throw new MissingProperty(missingProperties);
        }

        const walletRepo = repositories.wallets();
        const walletByNameByUser = await walletRepo.findOne({ ownerUsername: username, name });
        if (walletByNameByUser) {
            throw new DuplicateWallet();
        }

        return walletRepo.save({ name, balance, ownerUsername: username });
    }

    getByUser(username: User['username']) {
        return repositories.wallets().find({ ownerUsername: username });
    }

    async getById(id: Wallet['id'], username: User['username']) {
        const wallet = await repositories.wallets().findOne(id);

        if (!wallet) {
            throw new WalletNotFound();
        }

        if (wallet.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return wallet;
    }

    async deleteById(id: Wallet['id'], username: User['username']) {
        const walletRepo = repositories.wallets();
        const walletToDelete = await this.getById(id, username);

        return walletRepo.remove(walletToDelete);
    }

    async updateById(
        id: Wallet['id'],
        updatedName: Wallet['name'],
        updatedBalance: Wallet['balance'],
        username: User['username'],
    ) {
        const walletRepo = repositories.wallets();

        await this.getById(id, username);

        const walletWithNewName = await walletRepo.findOne({ name: updatedName, ownerUsername: username });

        if (walletWithNewName) {
            throw new DuplicateWallet();
        }

        return walletRepo.save({
            id,
            balance: updatedBalance,
            name: updatedName,
            ownerUsername: username,
        });
    }
}
