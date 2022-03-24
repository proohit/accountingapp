import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { Periodicity } from '../models/RecurrentRecord';

type PeriodicityFieldProps = {
  periodicityName: string;
  onPeriodicityChange: (event: SelectChangeEvent<string>) => void;
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
        onChange={(event) => onPeriodicityChange(event)}
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
