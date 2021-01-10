import { services } from '../../shared/services/services';
import { WalletController } from '../models/WalletController';

const WalletControllerImpl: WalletController = {
    createNewWallet: async (ctx) => {
        const { username } = ctx.state.token;
        const { name, balance } = ctx.request.body;

        const createdWallet = await services.walletService.createWallet(name, balance, username);

        return { status: 201, data: createdWallet };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.token;
        const walletsOfUser = await services.walletService.getByUser(username);
        return { status: 200, data: walletsOfUser };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;

        const wallet = await services.walletService.getById(id, username);

        return { status: 200, data: wallet };
    },

    deleteById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;

        const deletedWallet = await services.walletService.deleteById(id, username);

        return { status: 200, data: { message: `Deleted wallet with name ${deletedWallet.id}` } };
    },

    updateById: async (ctx) => {
        const username = ctx.state.token.username;
        const { id } = ctx.params;
        const { name: updatedName, balance: updatedBalance } = ctx.request.body;

        const updatedWallet = await services.walletService.updateById(id, updatedName, updatedBalance, username);

        return { status: 200, data: updatedWallet };
    },
};

export default WalletControllerImpl;
