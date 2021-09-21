import { TextField } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';

type ValueFieldProps = {
  value: string;
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
};
export const ValueField: FunctionComponent<ValueFieldProps> = (
  props: ValueFieldProps
) => {
  const { value, onValueChange, errorText } = props;
  return (
    <TextField
      variant="outlined"
      label="value"
      name="value"
      placeholder="0.00"
      value={value}
      onChange={onValueChange}
      fullWidth
      error={!!errorText}
      helperText={errorText}
      color="secondary"
    />
  );
};
