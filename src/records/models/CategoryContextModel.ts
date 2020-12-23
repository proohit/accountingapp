import { Category } from './Category';

export interface CategoryContextModel {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  getCategories(): void;
}
