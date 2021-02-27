import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { Category } from '../models/Category';

export interface CategoryApi {
  getCategoriesByUser(token: string): Promise<Category[]>;
}

export class CategoryApiService implements CategoryApi {
  async getCategoriesByUser(token: string): Promise<Category[]> {
    const categories = await BASE_API.get<Category[]>(
      API_ROUTES.CATEGORIES,
      token
    );
    return categories;
  }

  async createCategory(
    token: string,
    categoryName: Category['name']
  ): Promise<Category> {
    return BASE_API.post<Partial<Category>, Category>(
      API_ROUTES.CATEGORIES,
      { name: categoryName },
      token
    );
  }
}
