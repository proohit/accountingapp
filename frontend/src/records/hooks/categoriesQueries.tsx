import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Category } from '../models/Category';
import { CategoryApiService } from '../services/CategoryApi';

const categoryApi = new CategoryApiService();

export const useCategoriesQuery = () => {
  return useQuery(['getCategories'], () => categoryApi.getCategoriesByUser(), {
    staleTime: 15000,
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (categoryName: Category['name']) =>
      categoryApi.createCategory(categoryName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getCategories');
      },
    }
  );
};
