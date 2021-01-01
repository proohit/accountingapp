import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../entity/Category';
import { User } from '../../entity/User';
import { ResourceNotAllowed } from '../../shared/models/Errors';
import { CategoryNotFound } from '../models/Errors';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async getByIdIfAllowed(id: Category['id'], username: User['username']): Promise<Category> {
        const category = await this.findOne(id);

        if (!category) {
            throw new CategoryNotFound();
        }
        if (category.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }
        return category;
    }
}
