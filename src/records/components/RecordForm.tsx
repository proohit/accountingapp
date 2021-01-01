import {
  FormControl,
  FormHelperText,
  Grid,
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
import { useForm } from './useForm';

interface RecordFormProps {
  onRecordChange(record: Record): void;
  onFormValidChanged(isFormValid: boolean): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
  record?: Record;
}

export const RecordForm = (props: RecordFormProps) => {
  const {
    onRecordChange,
    onFormValidChanged,
    wallets,
    categories,
    owner,
    record,
  } = props;

  const [
    formFields,
    handleFormFieldChange,
    [formErrors, , isFormValid],
  ] = useForm(
    {
      id: record?.id || null,
      description: record?.description || '',
      value: record?.value.toString() || '0.00',
      walletName:
        (record?.walletId &&
          wallets?.length &&
          wallets.find((wallet) => wallet.id === record.walletId)?.name) ||
        (wallets?.length && wallets[0].name) ||
        '',
      category:
        (record?.categoryId &&
          categories?.length &&
          categories?.find((category) => category.id === record.categoryId)
            ?.name) ||
        (categories?.length > 0 && categories[0].name) ||
        '',
      timestamp: new RecordTimestamp(
        record?.timestamp || new Date(),
        record?.timestamp ? 'timestamp' : 'date'
      ).toInputString(),
    },
    {
      validation: {
        validationFunction: validateRecordField,
        initialValidation: true,
      },
    }
  );

  useEffect(() => {
    onRecordChange({
      id: formFields.id,
      description: formFields.description,
      timestamp: new RecordTimestamp(formFields.timestamp, 'input').toString(),
      value: formFields.value,
      walletId: wallets?.find((wallet) => wallet.name === formFields.walletName)
        ?.id,
      categoryId: categories?.find(
        (category) => formFields.category === category.name
      )?.id,
      ownerUsername: owner,
    });
  }, [formFields]);

  useEffect(() => {
    onFormValidChanged(isFormValid);
  }, [isFormValid]);

  return (
    <Grid container direction="column">
      <TextField
        error={!!formErrors['description']}
        helperText={formErrors['description']}
        color="secondary"
        label="description"
        name="description"
        value={formFields.description}
        onChange={handleFormFieldChange}
      />
      <TextField
        error={!!formErrors['value']}
        helperText={formErrors['value']}
        color="secondary"
        label="value"
        name="value"
        value={formFields.value}
        onChange={handleFormFieldChange}
      />
      <FormControl>
        <InputLabel>Wallet</InputLabel>
        <Select
          error={!!formErrors['walletName']}
          color="secondary"
          value={formFields.walletName}
          name="walletName"
          onChange={handleFormFieldChange}
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
          value={formFields.category}
          label="category"
          name="category"
          onChange={handleFormFieldChange}
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
        value={formFields.timestamp}
        onChange={handleFormFieldChange}
        type="datetime-local"
        fullWidth
      />
    </Grid>
  );
};
