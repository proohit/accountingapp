import { useQuery } from 'react-query';
import { CategoryApiService } from '../services/CategoryApi';

const categoryApi = new CategoryApiService();

export const useCategoriesQuery = (token: string) => {
  return useQuery(['getCategories', token], () =>
    categoryApi.getCategoriesByUser(token)
  );
};
