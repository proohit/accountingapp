import React, { useContext } from 'react';
import { CategoryContextModel } from '../models/CategoryContextModel';

export const CategoryContext = React.createContext<CategoryContextModel>(
  {} as CategoryContextModel
);

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('Category Context not provided');
  }

  return context;
};
