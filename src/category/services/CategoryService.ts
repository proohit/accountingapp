import { Category } from '../../entity/Category';
import { User } from '../../entity/User';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { CategoryNotFound, DuplicateCategory } from '../models/Errors';

export class CategoryService {
    async createCategory(name: Category['name'], username: User['username']) {
        const missingProperties = [];
        if (!name) missingProperties.push('name');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        const categoryRepository = repositories.categories();

        if (await categoryRepository.findOne({ name: name, ownerUsername: username })) {
            throw new DuplicateCategory();
        }

        const createdCategory = await categoryRepository.save({ name, ownerUsername: username });
        return createdCategory;
    }

    getByUser(username: User['username']) {
        return repositories.categories().find({ ownerUsername: username });
    }

    async deleteById(id: Category['id'], username: User['username']) {
        const categoryRepository = repositories.categories();

        const categoryToDelete = await this.getById(id, username);

        await categoryRepository.remove(categoryToDelete);
    }

    async getById(id: Category['id'], username: User['username']) {
        const foundCategory = await repositories.categories().findOne(id);

        if (!foundCategory) {
            throw new CategoryNotFound();
        }

        if (foundCategory.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return foundCategory;
    }

    async updateById(id: Category['id'], updatedName: Category['name'], username: User['username']) {
        const categoryRepo = repositories.categories();
        await this.getById(id, username);

        const updatedCategory = await categoryRepo.save({
            id,
            name: updatedName,
            ownerUsername: username,
        });

        return updatedCategory;
    }
}
