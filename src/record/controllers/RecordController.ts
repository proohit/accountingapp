import { CategoryNotFound } from '../../category/models/Errors';
import { MissingProperty } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { calculateOffset } from '../../shared/utils/paginationUtils';
import { UserNotFound } from '../../user/models/Errors';
import { RecordController } from '../models/RecordController';

const RecordControllerImpl: RecordController = {
    getByCategory: async (ctx) => {
        const { username } = ctx.state.token;
        const categoryid = ctx.params.category;
        const recordsByUserByCategory = await repositories.records().find({
            ownerUsername: username,
            categoryId: categoryid,
        });
        return { data: recordsByUserByCategory, status: 200 };
    },

    createNewRecord: async (ctx) => {
        const username = ctx.state.token.username;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;
        const missingProperties = [];
        if (!description) missingProperties.push('description');
        if (!value) missingProperties.push('value');
        if (!walletId) missingProperties.push('walletId');
        if (!categoryId) missingProperties.push('categoryId');
        if (!timestamp) missingProperties.push('timestamp');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        const walletRepo = repositories.wallets();
        const categoryRepo = repositories.categories();
        const recordRepo = repositories.records();
        const userRepo = repositories.users();

        const requestedWallet = await walletRepo.getByIdIfAllowed(walletId, username);
        const requestedCategory = await categoryRepo.getByIdIfAllowed(categoryId, username);
        const requestedOwner = await userRepo.findOne({ username });
        if (!requestedOwner) throw new UserNotFound();

        const createdRecord = await recordRepo.save({
            description,
            timestamp,
            value,
            ownerUsername: requestedOwner.username,
            categoryId: requestedCategory.id,
            walletId: requestedWallet.id,
        });

        return { status: 201, data: createdRecord };
    },

    getByUser: async (ctx) => {
        const { username } = ctx.state.token;
        const page: number = ctx.query.page || 1;
        const itemsPerPage: number = ctx.query.itemsPerPage || 20;
        const sortBy = ctx.query.sortBy;
        const sortDirection = ctx.query.sortDirection;

        const from = calculateOffset(page, itemsPerPage);
        const recordsRepo = repositories.records();
        const recordCount = await recordsRepo.count({ ownerUsername: username });

        const records = await recordsRepo.find({
            where: { ownerUsername: username },
            order: sortBy && sortDirection && { [sortBy]: sortDirection },
            skip: from,
            take: itemsPerPage,
        });

        return { status: 200, data: { data: records, page, dataCount: records.length, totalCount: recordCount } };
    },

    deleteById: async (ctx) => {
        const { username } = ctx.state.token;
        const requestedId = ctx.params.id;
        const recordRepo = repositories.records();
        const recordToDelete = await recordRepo.getByIdIfAllowed(requestedId, username);

        const deletedRecord = await recordRepo.remove(recordToDelete);
        return { status: 200, data: { message: `Deleted record with id ${deletedRecord.id}` } };
    },

    getById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const record = await repositories.records().getByIdIfAllowed(id, username);

        return { status: 200, data: record };
    },

    getByWallet: async (ctx) => {
        const { username } = ctx.state.token;
        const { walletId } = ctx.params;

        const result = await repositories.records().find({
            walletId: walletId,
            ownerUsername: username,
        });

        return { status: 200, data: result };
    },

    updateById: async (ctx) => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const { description, value, walletId, timestamp, categoryId } = ctx.request.body;
        const recordRepo = repositories.records();
        const walletRepo = repositories.wallets();
        const categoriesRepo = repositories.categories();

        await recordRepo.getByIdIfAllowed(id, username);

        const categoryOfRecord = await categoriesRepo.findOne({ ownerUsername: username, id: categoryId });
        if (!categoryOfRecord) {
            throw new CategoryNotFound();
        }

        const walletOfRecord = await walletRepo.getByIdIfAllowed(walletId, username);

        const updatedRecord = await recordRepo.save({
            id,
            description,
            value,
            timestamp,
            ownerUsername: username,
            walletId: walletOfRecord.id,
            categoryId: categoryOfRecord.id,
        });

        return { status: 200, data: updatedRecord };
    },
};

export default RecordControllerImpl;
