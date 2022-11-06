import { ApiRoutes, CategoryDto } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export interface CategoryApi {
  getCategoriesByUser(): Promise<CategoryDto[]>;
}

export class CategoryApiService implements CategoryApi {
  async getCategoriesByUser(): Promise<CategoryDto[]> {
    const categories = await BASE_API.get<CategoryDto[]>(ApiRoutes.CATEGORIES);
    return categories;
  }

  async createCategory(
    categoryName: CategoryDto['name']
  ): Promise<CategoryDto> {
    return BASE_API.post<Partial<CategoryDto>, CategoryDto>(
      ApiRoutes.CATEGORIES,
      {
        name: categoryName,
      }
    );
  }
}
