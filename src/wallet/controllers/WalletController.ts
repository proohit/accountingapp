import RECORD_MAPPER from '../../record/repositories/RecordMapper';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { DuplicateWallet } from '../models/Errors';
import { WalletController } from '../models/WalletController';
import WALLET_MAPPER from '../repositories/WalletMapper';

const WalletControllerImpl: WalletController = {
    createNewWallet: async (ctx) => {
        const { username } = ctx.state.token;
        const { name, balance } = ctx.request.body;

        const missingProperties = [];
        if (!name) missingProperties.push('name');
        if (!balance) missingProperties.push('balance');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        const walletsByUser = await WALLET_MAPPER.byUser(username);
        if (walletsByUser.find((wallet) => wallet.name === name)) throw new DuplicateWallet();

        const createdWallet = await WALLET_MAPPER.create(name, balance, username);
        return { status: 201, data: createdWallet };
    },

    getByUser: async (ctx) => {
        const decoded = ctx.state.token;
        const walletsOfUser = await WALLET_MAPPER.byUser(decoded.username);

        return { status: 200, data: walletsOfUser };
    },

    getByUserByName: async (ctx) => {
        const username = ctx.state.token.username;
        const wallet = await WALLET_MAPPER.byName(ctx.params.name, username);
        if (wallet.owner !== username) throw new ResourceNotAllowed();
        return { status: 200, data: wallet };
    },

    deleteByName: async (ctx) => {
        const username = ctx.state.token.username;
        const { name } = ctx.params;
        const walletToDelete = await WALLET_MAPPER.byName(name, username);
        const recordsByWallet = await RECORD_MAPPER.getByWallet(username, walletToDelete.name);
        recordsByWallet.forEach(async (record) => {
            await RECORD_MAPPER.deleteRecord(record.id);
        });

        const message = await WALLET_MAPPER.deleteWallet(name, username);

        return { status: 200, data: message };
    },

    updateByName: async (ctx) => {
        const username = ctx.state.token.username;
        const { name } = ctx.params;
        const { name: newName, balance } = ctx.request.body;

        const walletToUpdate = await WALLET_MAPPER.byName(name, username);
        if (walletToUpdate.name === newName) {
            ctx.status = 200;
            ctx.body = JSON.stringify(walletToUpdate);
            return;
        }

        const walletsByUser = await WALLET_MAPPER.byUser(username);
        const recordsByWallet = await RECORD_MAPPER.getByWallet(username, name);
        if (walletsByUser.some((wallet) => wallet.name === newName)) throw new DuplicateWallet();

        recordsByWallet.forEach(
            async (record) =>
                await RECORD_MAPPER.updateRecord(
                    record.id,
                    record.description,
                    record.value,
                    null,
                    record.timestamp,
                    record.owner,
                ),
        );

        const editedWallet = await WALLET_MAPPER.update(name, newName, balance, username);

        recordsByWallet.forEach(async (record) => {
            await RECORD_MAPPER.updateRecord(
                record.id,
                record.description,
                record.value,
                editedWallet.name,
                record.timestamp,
                record.owner,
            );
        });

        return { status: 200, data: editedWallet };
    },
};

export default WalletControllerImpl;
