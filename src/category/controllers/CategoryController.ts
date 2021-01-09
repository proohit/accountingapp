import { Category } from '../../entity/Category';
import { MessageResult, RouteResult } from '../../shared/models/RouteResult';
import { CategoryController } from '../models/CategoryController';
import { CategoryService } from '../services/CategoryService';

const categoryService = new CategoryService();

const CategoryControllerImpl: CategoryController = {
    getByUser: async (ctx): Promise<RouteResult<Category[]>> => {
        const { username } = ctx.state.token;

        const categoriesOfUser = await categoryService.getByUser(username);
        return { data: categoriesOfUser, status: 200 };
    },
    create: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const { name } = ctx.request.body;
        const createdCategory = await categoryService.createCategory(name, username);

        return { status: 201, data: createdCategory };
    },

    delete: async (ctx): Promise<RouteResult<MessageResult>> => {
        const { id } = ctx.params;
        const { username } = ctx.state.token;

        await categoryService.deleteById(id, username);

        return { data: { message: `Deleted category ${id}` }, status: 200 };
    },

    getById: async (ctx): Promise<RouteResult<Category>> => {
        const { id } = ctx.params;
        const { username } = ctx.state.token;

        const foundCategory = await categoryService.getById(id, username);

        return { data: foundCategory, status: 200 };
    },

    update: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const { name: updatedName } = ctx.request.body;

        const updatedCategory = await categoryService.updateById(id, updatedName, username);

        return { status: 200, data: updatedCategory };
    },
};

export default CategoryControllerImpl;
