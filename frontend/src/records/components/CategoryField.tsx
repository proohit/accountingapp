import { CategoryDto as Category } from '@accountingapp/shared';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { FunctionComponent } from 'react';

type CategoryFieldProps = {
  categoryName: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
  withAll?: boolean;
  withNew?: boolean;
  errorText?: string;
};

const filter = createFilterOptions();

export const CategoryField: FunctionComponent<CategoryFieldProps> = (props) => {
  const {
    categories,
    categoryName,
    onCategoryChange,
    withAll,
    withNew,
    errorText,
  } = props;

  const options = [];
  if (withAll) {
    options.push({ name: 'all', inputValue: 'all' });
  }

  options.push(
    ...categories?.map((category) => ({
      name: category.name,
      inputValue: category.name,
    }))
  );

  return (
    <Autocomplete
      multiple={false}
      value={categoryName}
      onChange={(_event, newValue) => {
        if (typeof newValue === 'string') {
          onCategoryChange(newValue);
        } else if (newValue?.inputValue) {
          onCategoryChange(newValue.inputValue);
        } else {
          onCategoryChange(newValue);
        }
      }}
      freeSolo={withNew}
      filterOptions={(prevOptions, params) => {
        const filtered = filter(prevOptions, params);
        if (
          params.inputValue !== '' &&
          !filtered.find(
            (option: { name: string; inputValue: string }) =>
              option.inputValue === params.inputValue
          ) &&
          withNew
        ) {
          filtered.push({
            inputValue: params.inputValue,
            name: `Create "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      isOptionEqualToValue={(option, value) => option.inputValue === value}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
      }}
      fullWidth
      renderOption={(optionProps, option) => (
        <li {...optionProps}>{option.name}</li>
      )}
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
