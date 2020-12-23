import React, { FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { CategoryContext } from '../hooks/useCategories';
import { Category } from '../models/Category';
import { CategoryApiService } from '../services/CategoryApi';

export const CategoryProvider: FunctionComponent = (props) => {
  const [categories, setCategories] = useState<Category[]>();
  const authentication = useAuthentication();
  const categoryApi = new CategoryApiService();

  const getCategories = async () => {
    const newCategories = await categoryApi.getCategoriesByUser(
      authentication.token
    );
    setCategories(newCategories);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        getCategories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
