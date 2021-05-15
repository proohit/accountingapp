import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';

type DescriptionFieldProps = {
  description: string;
  onDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
};
export const DescriptionField: FunctionComponent<DescriptionFieldProps> = (
  props: DescriptionFieldProps
) => {
  const { description, onDescriptionChange, errorText } = props;
  return (
    <TextField
      fullWidth
      variant="outlined"
      error={!!errorText}
      helperText={errorText}
      color="secondary"
      label="description"
      name="description"
      value={description}
      onChange={onDescriptionChange}
    />
  );
};
