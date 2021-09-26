import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Periodicity } from '../models/RecurrentRecord';

type PeriodicityFieldProps = {
  periodicityName: string;
  onPeriodicityChange: (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => void;
  periodicities: Periodicity[];
  errorText?: string;
  variant?: FormControlProps['variant'];
};

export const PeriodicityField: FunctionComponent<PeriodicityFieldProps> = (
  props
) => {
  const {
    onPeriodicityChange,
    periodicityName,
    periodicities,
    errorText,
    variant,
  } = props;
  return (
    <FormControl variant={variant || 'outlined'} fullWidth>
      <InputLabel>Periodicity</InputLabel>
      <Select
        error={!!errorText}
        color="secondary"
        value={periodicityName}
        name="periodicity"
        onChange={onPeriodicityChange}
        label="Periodicity"
      >
        {periodicities &&
          periodicities.map((periodicity) => (
            <MenuItem key={periodicity} value={periodicity}>
              {periodicity}
            </MenuItem>
          ))}
      </Select>
      {errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};
