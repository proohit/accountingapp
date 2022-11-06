import { CategoryDto } from '@accountingapp/shared';

export interface CategoryContextModel {
  categories: CategoryDto[];
  setCategories: (categories: CategoryDto[]) => void;
  getCategories(): void;
}
