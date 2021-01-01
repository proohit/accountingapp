import { Category } from '../../entity/Category';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { MessageResult, RouteResult } from '../../shared/models/RouteResult';
import { repositories } from '../../shared/repositories/database';
import { CategoryController } from '../models/CategoryController';
import { CategoryNotFound, DuplicateCategory } from '../models/Errors';

const CategoryControllerImpl: CategoryController = {
    getByUser: async (ctx): Promise<RouteResult<Category[]>> => {
        const { username } = ctx.state.token;

        const categoriesOfUser = await repositories.categories().find({ ownerUsername: username });
        return { data: categoriesOfUser, status: 200 };
    },
    create: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const { name } = ctx.request.body;
        const missingProperties = [];
        if (!name) missingProperties.push('name');
        if (missingProperties.length) throw new MissingProperty(missingProperties);
        const categoryRepository = repositories.categories();
        if (await categoryRepository.findOne({ name, ownerUsername: username })) {
            throw new DuplicateCategory();
        }
        const createdCategory = await categoryRepository.save({ name, ownerUsername: username });

        return { status: 201, data: createdCategory };
    },

    delete: async (ctx): Promise<RouteResult<MessageResult>> => {
        const { id } = ctx.params;
        const { username } = ctx.state.token;

        const categoryRepository = repositories.categories();

        const categoryToDelete = await categoryRepository.getByIdIfAllowed(id, username);

        await categoryRepository.remove(categoryToDelete);
        return { data: { message: `Deleted category ${id}` }, status: 200 };
    },

    getById: async (ctx): Promise<RouteResult<Category>> => {
        const { id } = ctx.params;
        const { username } = ctx.state.token;
        const foundCategory = await repositories.categories().findOne(id);

        if (!foundCategory) {
            throw new CategoryNotFound();
        }

        if (foundCategory.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return { data: foundCategory, status: 200 };
    },

    update: async (ctx): Promise<RouteResult<Category>> => {
        const { username } = ctx.state.token;
        const { id } = ctx.params;
        const { name: updatedName } = ctx.request.body;
        const categoryRepo = repositories.categories();
        await categoryRepo.getByIdIfAllowed(id, username);

        const updatedCategory = await categoryRepo.save({
            id,
            name: updatedName,
            ownerUsername: username,
        });

        return { status: 200, data: updatedCategory };
    },
};

export default CategoryControllerImpl;
