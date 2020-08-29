import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { MessageResult, RouteResult } from '../../shared/models/RouteResult';
import { Category } from '../models/Category';
import { CategoryController } from '../models/CategoryController';
import { DuplicateCategory } from '../models/Errors';
import CATEGORY_MAPPER from '../repositories/CategoryMapper';

const CategoryControllerImpl: CategoryController = {
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
        const updatedCategory = await CATEGORY_MAPPER.update(username, categoryToUpdateName, updatedName);
        // TODO: Add record updates
        return { status: 200, data: updatedCategory };
    },
};

export default CategoryControllerImpl;
