import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Category } from '../models/Category';
import { CategoryApiService } from '../services/CategoryApi';

const categoryApi = new CategoryApiService();

export const useCategoriesQuery = (token: string) => {
  return useQuery(
    ['getCategories', token],
    () => categoryApi.getCategoriesByUser(token),
    { initialData: [] }
  );
};

export const useCreateCategoryMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (categoryName: Category['name']) =>
      categoryApi.createCategory(token, categoryName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getCategories');
      },
    }
  );
};
