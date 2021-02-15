import { services } from '../../shared/services/services';
import { RecordController } from '../models/RecordController';

const RecordControllerImpl: RecordController = {
    getByCategory: async (ctx) => {
        const { username } = ctx.state.token;
        const categoryId = ctx.params.category;

        const recordsByUserByCategory = await services.recordService.getByCategory(categoryId, username);

        return { data: recordsByUserByCategory, status: 200 };
    },

    createNewRecord: async (ctx) => {
        const username = ctx.state.token.username;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;

        const createdRecord = await services.recordService.createRecord(
            description,
            value,
            timestamp,
            walletId,
            categoryId,
            username,
        );

        return { status: 201, data: createdRecord };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.token;
        const {
            page,
            itemsPerPage,
            sortBy,
            sortDirection,
            categoryId,
            walletId,
            description,
            timestampFrom,
            timestampTo,
        } = ctx.query;

        const records = await services.recordService.getByQuery(
            {
                itemsPerPage,
                page,
                sortBy,
                sortDirection,
                filterBy: { categoryId, walletId, description, timestampFrom, timestampTo },
            },
            username,
        );

        const recordCount = await services.recordService.getRecordsCountByQuery(
            { filterBy: { categoryId, description, walletId } },
            username,
        );

        return { status: 200, data: { data: records, page, dataCount: records.length, totalCount: recordCount } };
    },

    deleteById: async (ctx) => {
        const { username } = ctx.state.token;
        const id = ctx.params.id;

        const deletedRecord = await services.recordService.deleteById(id, username);
        return { status: 200, data: { message: `Deleted record with id ${deletedRecord.id}` } };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;

        const record = await services.recordService.getById(id, username);

        return { status: 200, data: record };
    },

    getByWallet: async (ctx) => {
        const { username } = ctx.state.token;
        const { walletId } = ctx.params;

        const recordsByWallet = await services.recordService.getByWallet(walletId, username);

        return { status: 200, data: recordsByWallet };
    },

    updateById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;

        const updatedRecord = await services.recordService.updateById(
            id,
            username,
            description,
            value,
            timestamp,
            walletId,
            categoryId,
        );

        return { status: 200, data: updatedRecord };
    },
};

export default RecordControllerImpl;
