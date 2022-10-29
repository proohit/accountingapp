import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from './entities/category.entity';
import { DuplicateCategoryError } from './errors/duplicate-category.error';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(name: Category['name'], username: User['username']) {
    const categoryRepository = this.categoryRepository;

    if (
      await categoryRepository.findOneBy({
        name: name,
        ownerUsername: username,
      })
    ) {
      throw new DuplicateCategoryError();
    }

    const createdCategory = await categoryRepository.save({
      name,
      ownerUsername: username,
    });
    return createdCategory;
  }

  getByUser(username: User['username']) {
    return this.categoryRepository.findBy({ ownerUsername: username });
  }

  async deleteById(id: Category['id'], username: User['username']) {
    const categoryToDelete = await this.getById(id, username);

    await this.categoryRepository.remove(categoryToDelete);
  }

  async getById(id: Category['id'], username: User['username']) {
    const foundCategory = await this.categoryRepository.findOneBy({ id });

    if (!foundCategory || foundCategory?.ownerUsername !== username) {
      throw new NotFoundException();
    }

    return foundCategory;
  }

  async updateById(
    id: Category['id'],
    updatedName: Category['name'],
    username: User['username'],
  ) {
    await this.getById(id, username);

    const updatedCategory = await this.categoryRepository.save({
      id,
      name: updatedName,
      ownerUsername: username,
    });

    return updatedCategory;
  }
}
