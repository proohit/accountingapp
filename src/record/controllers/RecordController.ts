import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { byName } from '../../wallet/repositories/WalletMapper';
import { RecordController } from '../models/RecordController';
import { byUser, byId, byWallet, createRecord, deleteRecord, update } from '../repositories/RecordMapper';
import { calculateOffset } from '../../shared/utils/paginationUtils';

const RecordControllerImpl: RecordController = {
    createNewRecord: async (ctx) => {
        const username = ctx.state.token.username;
        const { description, value, walletName, timestamp } = ctx.request.body;
        const missingProperties = [];
        if (!description) missingProperties.push('description');
        if (!value) missingProperties.push('value');
        if (!walletName) missingProperties.push('walletName');
        if (!timestamp) missingProperties.push('timestamp');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        await byName(walletName, username);
        const createdRecord = await createRecord(description, value, walletName, timestamp, username);

        return { status: 201, data: createdRecord };
    },

    getByUser: async (ctx) => {
        const decoded = ctx.state.token;
        const page: number = ctx.query.page || 1;
        const itemsPerPage: number = ctx.query.itemsPerPage || 20;

        const from = calculateOffset(page, itemsPerPage);
        const records = await byUser(decoded.username, from, itemsPerPage);
        return { status: 200, data: { data: records, page, total: records.length } };
    },

    deleteById: async (ctx) => {
        const requestedId = ctx.params.id;
        const recordToDelete = await byId(requestedId);
        if (recordToDelete.owner !== ctx.state.token.username) throw new ResourceNotAllowed();
        const message = await deleteRecord(requestedId);
        return { status: 200, data: message };
    },

    getById: async (ctx) => {
        const username = ctx.state.token.username;
        const record = await byId(ctx.params.id);
        if (record.owner !== username) throw new ResourceNotAllowed();
        return { status: 200, data: record };
    },

    getByWallet: async (ctx) => {
        const decoded = ctx.state.token;
        const result = await byWallet(decoded.username, ctx.params.wallet);
        return { status: 200, data: result };
    },

    updateById: async (ctx) => {
        const decoded = ctx.state.token;
        const { id, description, value, walletName, timestamp } = ctx.request.body;
        if (!id) throw new MissingProperty(['id']);
        const record = await byId(id);
        if (decoded.username !== record.owner) throw new ResourceNotAllowed();
        const updatedRecord = await update(id, description, value, walletName, timestamp, decoded.username);

        return { status: 200, data: updatedRecord };
    },
};

export default RecordControllerImpl;
