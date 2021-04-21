import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { Category } from '../models/Category';

export interface CategoryApi {
  getCategoriesByUser(): Promise<Category[]>;
}

export class CategoryApiService implements CategoryApi {
  async getCategoriesByUser(): Promise<Category[]> {
    const categories = await BASE_API.get<Category[]>(API_ROUTES.CATEGORIES);
    return categories;
  }

  async createCategory(categoryName: Category['name']): Promise<Category> {
    return BASE_API.post<Partial<Category>, Category>(API_ROUTES.CATEGORIES, {
      name: categoryName,
    });
  }
}
