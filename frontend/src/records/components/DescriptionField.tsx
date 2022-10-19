import { TextField } from '@mui/material';
import React, { ChangeEvent, FunctionComponent } from 'react';

type DescriptionFieldProps = {
  description: string;
  onDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  multiline?: boolean;
};
export const DescriptionField: FunctionComponent<DescriptionFieldProps> = (
  props: DescriptionFieldProps
) => {
  const { description, onDescriptionChange, errorText, multiline } = props;
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
      multiline={multiline}
      maxRows={multiline ? 6 : 1}
    />
  );
};
