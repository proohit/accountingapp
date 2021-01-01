import { getRepository } from 'typeorm';
import { Wallet } from '../../entity/Wallet';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { DuplicateWallet, WalletNotFound } from '../models/Errors';
import { WalletController } from '../models/WalletController';

const WalletControllerImpl: WalletController = {
    createNewWallet: async (ctx) => {
        const { username } = ctx.state.token;
        const { name, balance } = ctx.request.body;

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

        const walletRepo = getRepository(Wallet);
        const walletByNameByUser = await walletRepo.findOne({ ownerUsername: username, name });
        if (walletByNameByUser) {
            throw new DuplicateWallet();
        }

        const createdWallet = await walletRepo.save({ name, balance, ownerUsername: username });
        return { status: 201, data: createdWallet };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.token;
        const walletsOfUser = await repositories.wallets().find({ owner: { username } });

        return { status: 200, data: walletsOfUser };
    },

    getById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const wallet = await repositories.wallets().findOne(id);

        if (!wallet) {
            throw new WalletNotFound();
        }

        if (wallet.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return { status: 200, data: wallet };
    },

    deleteById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const walletRepo = repositories.wallets();
        const walletToDelete = await walletRepo.findOne(id);

        if (walletToDelete.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        await walletRepo.remove(walletToDelete);

        return { status: 200, data: { message: `Deleted wallet with name ${id}` } };
    },

    updateById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const { name: newName, balance } = ctx.request.body;

        const walletRepo = repositories.wallets();

        const walletToUpdate = await walletRepo.findOne(id);

        if (!walletToUpdate) {
            throw new WalletNotFound();
        }

        if (walletToUpdate.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        const walletWithNewName = await walletRepo.findOne({ name: newName, ownerUsername: username });

        if (walletWithNewName) {
            throw new DuplicateWallet();
        }

        const editedWallet = await walletRepo.save({ ...walletToUpdate, balance, name: newName });

        return { status: 200, data: editedWallet };
    },
};

export default WalletControllerImpl;
