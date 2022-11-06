import { CategoryDto as Category } from '@accountingapp/shared';

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

export const getCategoryByIdOrName = (
  categories: Category[],
  categoryName: Category['name']
) => {
  const foundCategory =
    getCategoryByName(categories, categoryName) ||
    getCategoryById(categories, categoryName);
  return foundCategory;
};
