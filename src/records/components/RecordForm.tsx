import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useValidation } from '../../shared/hooks/useValidation';
import { Wallet } from '../../wallets/models/Wallet';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { RecordTimestamp } from '../models/RecordTimestamp';
import { validateRecordField } from '../services/RecordValidator';

interface RecordFormProps {
  onRecordChange(record: Record): void;
  onFormValidChanged(isFormValid: boolean): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
}

const defaultTimestamp = new RecordTimestamp(new Date(), 'date');

export const RecordForm = (props: RecordFormProps) => {
  const {
    onRecordChange,
    onFormValidChanged,
    wallets,
    categories,
    owner,
  } = props;
  const [descriptionValue, setDescriptionValue] = useState('');
  const [valueValue, setValueValue] = useState(0);
  const [walletValue, setWalletValue] = useState(
    (wallets && wallets.length > 0 && wallets[0].name) || ''
  );
  const [categoryValue, setCategoryValue] = useState(
    (categories && categories.length > 0 && categories[0].name) || ''
  );
  const [timestampValue, setTimestampValue] = useState(
    defaultTimestamp.toInputString()
  );
  const [formErrors, validateField, , validateRecord] = useValidation<Record>(
    validateRecordField,
    {
      category: '',
      description: '',
      timestamp: '',
      value: '',
      walletName: '',
      owner: '',
    }
  );
  useEffect(() => {
    const isFormInitiallyValid = validateRecord(
      {
        description: descriptionValue,
        value: valueValue,
        walletName: walletValue,
        category: categoryValue,
        timestamp: timestampValue,
        owner,
      },
      ['category', 'description', 'timestamp', 'value', 'walletName']
    );
    onFormValidChanged(isFormInitiallyValid);
  }, []);
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name || event.currentTarget.name;
    const value = event.target.value || event.currentTarget.value;

    const newRecord: Record = {
      description: descriptionValue,
      value: valueValue,
      walletName: walletValue,
      category: categoryValue,
      timestamp: new RecordTimestamp(timestampValue, 'input').toString(),
      owner,
    };

    let newValue: string | number = value;

    const isNewFormValid = validateField(name as keyof Record, newValue);

    switch (name) {
      case 'description':
        setDescriptionValue(newValue);
        break;
      case 'value':
        newValue = (newValue && +parseFloat(newValue)) || 0;
        setValueValue(newValue);
        break;
      case 'walletName':
        setWalletValue(newValue);
        break;
      case 'category':
        setCategoryValue(newValue);
        break;
      case 'timestamp':
        setTimestampValue(newValue);
        newValue = new RecordTimestamp(value, 'input').toString();
        break;
    }

    newRecord[name] = newValue;
    onRecordChange(newRecord);
    onFormValidChanged(isNewFormValid);
  };

  return (
    <Grid container direction="column">
      <TextField
        error={!!formErrors['description']}
        helperText={formErrors['description']}
        color="secondary"
        label="description"
        name="description"
        value={descriptionValue}
        onChange={handleFieldChange}
      />
      <TextField
        error={!!formErrors['value']}
        helperText={formErrors['value']}
        color="secondary"
        label="value"
        name="value"
        value={valueValue}
        onChange={handleFieldChange}
        type="number"
      />
      <FormControl>
        <InputLabel>Wallet</InputLabel>
        <Select
          error={!!formErrors['walletName']}
          color="secondary"
          value={walletValue}
          name="walletName"
          onChange={handleFieldChange}
        >
          {wallets &&
            wallets.map((wallet) => (
              <MenuItem key={wallet.name} value={wallet.name}>
                {wallet.name}
              </MenuItem>
            ))}
        </Select>
        {formErrors['walletName'] && (
          <FormHelperText>{formErrors['walletName']}</FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          style={{ width: '100%' }}
          error={!!formErrors['category']}
          color="secondary"
          value={categoryValue}
          label="category"
          name="category"
          onChange={handleFieldChange}
        >
          {categories &&
            categories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
        </Select>
        {formErrors['category'] && (
          <FormHelperText>{formErrors['category']}</FormHelperText>
        )}
      </FormControl>
      <TextField
        error={!!formErrors['timestamp']}
        helperText={formErrors['timestamp']}
        color="secondary"
        label="timestamp"
        name="timestamp"
        value={timestampValue}
        onChange={handleFieldChange}
        type="datetime-local"
        fullWidth
      />
    </Grid>
  );
};
