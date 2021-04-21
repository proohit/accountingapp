import { Category } from '../models/Category';

export const getCategoryByName = (
  categories: Category[],
  categoryName: Category['name']
) => {
  return categories?.find((category) => categoryName === category.name);
};
export function getCategoryById(
  categories: Category[],
  categoryId: Category['id']
) {
  return categories?.find((category) => category.id === categoryId);
}
