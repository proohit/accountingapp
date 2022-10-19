import { Record } from '../../entity/Record';
import { services } from '../../shared/services/services';
import { parseIntQuery, parseQuery } from '../../shared/utils/queryUtils';
import { RecordController } from '../models/RecordController';

const RecordControllerImpl: RecordController = {
    getByCategory: async (ctx) => {
        const { username } = ctx.state.user;
        const categoryId = ctx.params.category;

        const recordsByUserByCategory = await services().recordService.getByCategory(categoryId, username);

        return { data: recordsByUserByCategory, status: 200 };
    },

    createNewRecord: async (ctx) => {
        const username = ctx.state.user.username;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;

        const createdRecord = await services().recordService.createRecord(
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
        const { username } = ctx.state.user;
        const { sortBy, sortDirection, categoryId, walletId, description, timestampFrom, timestampTo } = parseQuery(
            ctx.query,
        );
        const page = parseIntQuery(ctx.query.page);
        const itemsPerPage = parseIntQuery(ctx.query.itemsPerPage);
        const records = await services().recordService.getByQuery(
            {
                itemsPerPage,
                page,
                sortBy: sortBy as keyof Record,
                sortDirection: sortDirection as 'asc' | 'desc',
                filterBy: { categoryId, walletId, description, timestampFrom, timestampTo },
            },
            username,
        );

        const recordCount = await services().recordService.getRecordsCountByQuery(
            { filterBy: { categoryId, description, walletId } },
            username,
        );

        return { status: 200, data: { data: records, page, dataCount: records.length, totalCount: recordCount } };
    },

    deleteById: async (ctx) => {
        const { username } = ctx.state.user;
        const id = ctx.params.id;

        const deletedRecord = await services().recordService.deleteById(id, username);
        return { status: 200, data: { message: `Deleted record with id ${deletedRecord.id}` } };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.user;
        const { id } = ctx.params;

        const record = await services().recordService.getById(id, username);

        return { status: 200, data: record };
    },

    getByWallet: async (ctx) => {
        const { username } = ctx.state.user;
        const { walletId } = ctx.params;

        const recordsByWallet = await services().recordService.getByWallet(walletId, username);

        return { status: 200, data: recordsByWallet };
    },

    updateById: async (ctx) => {
        const { username } = ctx.state.user;
        const { id } = ctx.params;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;

        const updatedRecord = await services().recordService.updateById(
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
    checkIfExternalReferencesExist: async (ctx) => {
        const { username } = ctx.state.user;
        const records = ctx.request.body;

        const existingRecords = await services().recordService.checkIfExternalReferencesExist(records, username);

        return { status: 200, data: existingRecords };
    },

    createManyRecords: async (ctx) => {
        const { username } = ctx.state.user;
        const records = ctx.request.body;

        const createdRecords = await services().recordService.createManyRecords(records, username);

        return { status: 201, data: createdRecords };
    },
};

export default RecordControllerImpl;
