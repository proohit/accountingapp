import { MissingProperty } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { DuplicateWallet } from '../models/Errors';
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

        const walletRepo = repositories.wallets();
        const walletByNameByUser = await walletRepo.findOne({ ownerUsername: username, name });
        if (walletByNameByUser) {
            throw new DuplicateWallet();
        }

        const createdWallet = await walletRepo.save({ name, balance, ownerUsername: username });
        return { status: 201, data: createdWallet };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.token;
        const walletsOfUser = await repositories.wallets().find({ ownerUsername: username });

        return { status: 200, data: walletsOfUser };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const wallet = await repositories.wallets().getByIdIfAllowed(id, username);

        return { status: 200, data: wallet };
    },

    deleteById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const walletRepo = repositories.wallets();
        const walletToDelete = await walletRepo.getByIdIfAllowed(id, username);

        await walletRepo.remove(walletToDelete);

        return { status: 200, data: { message: `Deleted wallet with name ${id}` } };
    },

    updateById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const { name: newName, balance } = ctx.request.body;

        const walletRepo = repositories.wallets();

        await walletRepo.getByIdIfAllowed(id, username);

        const walletWithNewName = await walletRepo.findOne({ name: newName, ownerUsername: username });

        if (walletWithNewName) {
            throw new DuplicateWallet();
        }

        const editedWallet = await walletRepo.save({ id, balance, name: newName, ownerUsername: username });

        return { status: 200, data: editedWallet };
    },
};

export default WalletControllerImpl;
