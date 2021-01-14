import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../entity/Category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
