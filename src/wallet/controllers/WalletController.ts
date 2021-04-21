import { services } from '../../shared/services/services';
import { WalletController } from '../models/WalletController';

const WalletControllerImpl: WalletController = {
    createNewWallet: async (ctx) => {
        const { username } = ctx.state.user;
        const { name, balance } = ctx.request.body;

        const createdWallet = await services.walletService.createWallet(name, balance, username);

        return { status: 201, data: createdWallet };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.user;
        const walletsOfUser = await services.walletService.getByUser(username);
        return { status: 200, data: walletsOfUser };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.user;
        const { id } = ctx.params;

        const wallet = await services.walletService.getById(id, username);

        return { status: 200, data: wallet };
    },

    deleteById: async (ctx) => {
        const username = ctx.state.user.username;
        const { id } = ctx.params;

        const deletedWallet = await services.walletService.deleteById(id, username);

        return { status: 200, data: { message: `Deleted wallet with name ${deletedWallet.id}` } };
    },

    updateById: async (ctx) => {
        const username = ctx.state.user.username;
        const { id } = ctx.params;
        const { name: updatedName, balance: initialBalance } = ctx.request.body;

        const updatedWallet = await services.walletService.updateById(id, updatedName, initialBalance, username);

        return { status: 200, data: updatedWallet };
    },

    updateBalance: async (ctx) => {
        const username = ctx.state.user.username;
        const { id } = ctx.params;

        const updatedWallet = await services.walletService.recalculateCurrentBalance(id, username);

        return { status: 200, data: updatedWallet };
    },
};

export default WalletControllerImpl;
