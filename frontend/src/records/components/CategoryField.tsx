import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { FunctionComponent, useState } from 'react';
import { Category } from '../models/Category';

type CategoryFieldProps = {
  categoryName: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  withAll?: boolean;
  withNew?: boolean;
  errorText?: string;
};
export const CategoryField: FunctionComponent<CategoryFieldProps> = (props) => {
  const {
    categories,
    categoryName,
    onCategoryChange,
    withAll,
    withNew,
    errorText,
  } = props;

  const [categoryInput, setCategoryInput] = useState(categoryName);
  const options = [];
  if (withAll) {
    options.push('all');
  }

  options.push(...categories?.map((option) => option.name));
  return (
    <Autocomplete
      value={categoryName}
      onChange={(_event, newValue) => {
        onCategoryChange(newValue);
      }}
      freeSolo={withNew}
      inputValue={categoryInput}
      onInputChange={(_event, newInputValue) => {
        if (withNew) {
          onCategoryChange(newInputValue);
          setCategoryInput(newInputValue);
        } else {
          if (options.includes(newInputValue)) {
            onCategoryChange(newInputValue);
          }
          setCategoryInput(newInputValue);
        }
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          error={!!errorText}
          helperText={errorText}
          variant="outlined"
        />
      )}
    />
  );
};
