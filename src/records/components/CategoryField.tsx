import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Category } from '../models/Category';

type CategoryFieldProps = {
  categoryName: string;
  onCategoryChange: (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => void;
  categories: Category[];
  withAll?: boolean;
  errorText?: string;
};
export const CategoryField: FunctionComponent<CategoryFieldProps> = (props) => {
  const {
    categories,
    categoryName,
    onCategoryChange,
    withAll,
    errorText,
  } = props;
  return (
    <FormControl variant="outlined">
      <InputLabel>Category</InputLabel>
      <Select
        error={!!errorText}
        color="secondary"
        fullWidth
        value={categoryName}
        label="category"
        name="categoryName"
        onChange={onCategoryChange}
      >
        {withAll && (
          <MenuItem key="all" value="all">
            All categories
          </MenuItem>
        )}
        {categories &&
          categories.map((category) => (
            <MenuItem key={category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
