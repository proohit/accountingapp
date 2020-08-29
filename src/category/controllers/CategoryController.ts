import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { MessageResult, RouteResult } from '../../shared/models/RouteResult';
import { Category } from '../models/Category';
import { CategoryController } from '../models/CategoryController';
import { DuplicateCategory } from '../models/Errors';
import CATEGORY_MAPPER from '../repositories/CategoryMapper';
import RECORD_MAPPER from '../../record/repositories/RecordMapper';

const CategoryControllerImpl: CategoryController = {
    getByUser: async (ctx): Promise<RouteResult<Category[]>> => {
        const { username } = ctx.state.token;

        const categoriesOfUser = await CATEGORY_MAPPER.getByUser(username);
        return { data: categoriesOfUser, status: 200 };
    },
    create: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const { name } = ctx.request.body;
        const missingProperties = [];
        if (!name) missingProperties.push('name');
        if (missingProperties.length) throw new MissingProperty(missingProperties);
        const categoriesOfUser = await CATEGORY_MAPPER.getByUser(username);
        if (categoriesOfUser.find((categoryOfUser) => categoryOfUser.name === name)) throw new DuplicateCategory();
        const createdCategory = await CATEGORY_MAPPER.create(username, name);

        return { status: 201, data: createdCategory };
    },
    delete: async (ctx): Promise<RouteResult<MessageResult>> => {
        const categoryNameToDelete = ctx.params.name;
        const { username } = ctx.state.token;
        const categoryToDelete = await CATEGORY_MAPPER.getByName(username, categoryNameToDelete);
        if (username !== categoryToDelete.owner) throw new ResourceNotAllowed();
        const recordsByUserByCategory = await RECORD_MAPPER.getByCategory(username, categoryNameToDelete);
        recordsByUserByCategory.forEach(async (record) => await RECORD_MAPPER.deleteRecord(record.id));
        const messageResult = await CATEGORY_MAPPER.delete(username, categoryToDelete.name);
        return { data: messageResult, status: 200 };
    },
    getByName: async (ctx): Promise<RouteResult<Category>> => {
        const requestedName = ctx.params.name;
        const { username } = ctx.state.token;
        const foundCategory = await CATEGORY_MAPPER.getByName(username, requestedName);
        return { data: foundCategory, status: 200 };
    },
    update: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const categoryToUpdateName = ctx.params.name;
        const { name: updatedName } = ctx.request.body;
        const categoryToUpdate = await CATEGORY_MAPPER.getByName(username, categoryToUpdateName);
        if (username !== categoryToUpdate.owner) throw new ResourceNotAllowed();

        const recordsByUserByCategory = await RECORD_MAPPER.getByCategory(username, categoryToUpdateName);
        recordsByUserByCategory.forEach(
            async (record) =>
                await RECORD_MAPPER.updateRecord(
                    record.id,
                    record.description,
                    record.value,
                    record.walletName,
                    record.timestamp,
                    record.owner,
                    null,
                ),
        );
        const updatedCategory = await CATEGORY_MAPPER.update(username, categoryToUpdateName, updatedName);
        recordsByUserByCategory.forEach(
            async (record) =>
                await RECORD_MAPPER.updateRecord(
                    record.id,
                    record.description,
                    record.value,
                    record.walletName,
                    record.timestamp,
                    record.owner,
                    updatedCategory.name,
                ),
        );
        return { status: 200, data: updatedCategory };
    },
};

export default CategoryControllerImpl;
