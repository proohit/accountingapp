import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { calculateOffset } from '../../shared/utils/paginationUtils';
import WALLET_MAPPER from '../../wallet/repositories/WalletMapper';
import { RecordController } from '../models/RecordController';
import RECORD_MAPPER from '../repositories/RecordMapper';
import CATEGORY_MAPPER from '../../category/repositories/CategoryMapper';

const RecordControllerImpl: RecordController = {
    getByCategory: async (ctx) => {
        const { username } = ctx.state.token;
        const categoryName = ctx.params.category;
        const recordsByUserByCategory = await RECORD_MAPPER.getByCategory(username, categoryName);
        return { data: recordsByUserByCategory, status: 200 };
    },
    createNewRecord: async (ctx) => {
        const username = ctx.state.token.username;
        const { description, value, walletName, timestamp, category } = ctx.request.body;
        const missingProperties = [];
        if (!description) missingProperties.push('description');
        if (!value) missingProperties.push('value');
        if (!walletName) missingProperties.push('walletName');
        if (!category) missingProperties.push('category');
        if (!timestamp) missingProperties.push('timestamp');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        await WALLET_MAPPER.byName(walletName, username);
        await CATEGORY_MAPPER.getByName(username, category);
        const createdRecord = await RECORD_MAPPER.createRecord(
            description,
            value,
            walletName,
            timestamp,
            username,
            category,
        );

        return { status: 201, data: createdRecord };
    },

    getByUser: async (ctx) => {
        const decoded = ctx.state.token;
        const page: number = ctx.query.page || 1;
        const itemsPerPage: number = ctx.query.itemsPerPage || 20;
        const sortBy = ctx.query.sortBy;
        const sortDirection = ctx.query.sortDirection;

        const from = calculateOffset(page, itemsPerPage);
        const records = await RECORD_MAPPER.getByQuery(decoded.username, {
            from,
            to: itemsPerPage,
            sortBy,
            sortDirection,
        });
        return { status: 200, data: { data: records, page, total: records.length } };
    },

    deleteById: async (ctx) => {
        const requestedId = ctx.params.id;
        const recordToDelete = await RECORD_MAPPER.getById(requestedId);
        if (recordToDelete.owner !== ctx.state.token.username) throw new ResourceNotAllowed();
        const message = await RECORD_MAPPER.deleteRecord(requestedId);
        return { status: 200, data: message };
    },

    getById: async (ctx) => {
        const username = ctx.state.token.username;
        const record = await RECORD_MAPPER.getById(ctx.params.id);
        if (record.owner !== username) throw new ResourceNotAllowed();
        return { status: 200, data: record };
    },

    getByWallet: async (ctx) => {
        const decoded = ctx.state.token;
        const result = await RECORD_MAPPER.getByWallet(decoded.username, ctx.params.wallet);
        return { status: 200, data: result };
    },

    updateById: async (ctx) => {
        const decoded = ctx.state.token;
        const id = ctx.params.id;
        const { description, value, walletName, timestamp, category } = ctx.request.body;
        const record = await RECORD_MAPPER.getById(id);
        if (decoded.username !== record.owner) throw new ResourceNotAllowed();
        const updatedRecord = await RECORD_MAPPER.updateRecord(
            id,
            description,
            value,
            walletName,
            timestamp,
            decoded.username,
            category,
        );

        return { status: 200, data: updatedRecord };
    },
};

export default RecordControllerImpl;
