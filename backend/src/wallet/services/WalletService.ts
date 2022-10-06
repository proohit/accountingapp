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
        const walletByNameByUser = await walletRepo.findOneBy({ ownerUsername: username, name });
        if (walletByNameByUser) {
            throw new DuplicateWallet();
        }

        return walletRepo.save({ name, balance, ownerUsername: username, currentBalance: balance });
    }

    getByUser(username: User['username']) {
        return repositories.wallets().findBy({ ownerUsername: username });
    }

    async getById(id: Wallet['id'], username: User['username']) {
        const wallet = await repositories.wallets().findOneBy({ id });

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
        initialBalance: Wallet['balance'],
        username: User['username'],
        updatedBalance?: Wallet['currentBalance'],
    ) {
        const walletRepo = repositories.wallets();

        await this.getById(id, username);

        const walletWithNewName = await walletRepo.findOneBy({ name: updatedName, ownerUsername: username });

        if (walletWithNewName && walletWithNewName.id !== id) {
            throw new DuplicateWallet();
        }

        let recalculatedBalance = updatedBalance;

        if (!updatedBalance && updatedBalance !== 0) {
            recalculatedBalance = await this.getCalculatedBalance(id, username, initialBalance);
        }

        return walletRepo.save({
            id,
            balance: initialBalance,
            currentBalance: recalculatedBalance,
            name: updatedName,
            ownerUsername: username,
        });
    }

    async recalculateCurrentBalance(id: Wallet['id'], username: User['username']) {
        const walletToUpdate = await this.getById(id, username);
        const recalculatedBalance = await this.getCalculatedBalance(id, username);

        const updatedWallet = await this.updateById(
            id,
            walletToUpdate.name,
            walletToUpdate.balance,
            username,
            recalculatedBalance,
        );

        return updatedWallet;
    }

    private async getCalculatedBalance(
        id: Wallet['id'],
        username: User['username'],
        initialBalance?: Wallet['balance'],
    ) {
        const recordsRepo = repositories.records();
        const walletToUpdate = await this.getById(id, username);
        const recordsSumByWallet = await recordsRepo
            .createQueryBuilder()
            .select(['COALESCE(SUM(value),0) as balanceByValue'])
            .where({ walletId: id })
            .getRawOne();
        const sanitizedInitialBalance = isNaN(initialBalance) ? walletToUpdate.balance : initialBalance;
        const newBalance = recordsSumByWallet.balanceByValue + sanitizedInitialBalance;
        return newBalance;
    }
}
