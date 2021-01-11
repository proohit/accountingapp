import { Grid, TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from '../../shared/hooks/useForm';
import { Wallet } from '../../wallets/models/Wallet';
import {
  getWalletById,
  getWalletByName,
} from '../../wallets/utils/walletUtils';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { validateRecordField } from '../services/RecordValidator';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { timestampFormat } from './timestampFormat';
import { WalletField } from './WalletField';

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
  ] = useForm<Partial<Record> & { categoryName: string; walletName: string }>(
    {
      id: record?.id || null,
      description: record?.description || '',
      value: record?.value.toString() || '0.00',
      walletName:
        getWalletById(wallets, record?.walletId)?.name ||
        (wallets?.length && wallets[0].name) ||
        '',
      categoryName:
        getCategoryById(categories, record?.categoryId)?.name ||
        (categories?.length > 0 && categories[0].name) ||
        '',
      timestamp: dayjs(record?.timestamp).format(timestampFormat),
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
      timestamp: dayjs(formFields.timestamp).toISOString(),
      value: Number(formFields.value),
      walletId: getWalletByName(wallets, formFields.walletName)?.id,
      categoryId: getCategoryByName(categories, formFields.categoryName)?.id,
      ownerUsername: owner,
    });
  }, [formFields]);

  useEffect(() => {
    onFormValidChanged(isFormValid);
  }, [isFormValid]);

  return (
    <Grid container direction="column" style={{ gap: 16 }}>
      <DescriptionField
        description={formFields.description}
        onDescriptionChange={handleFormFieldChange}
        errorText={formErrors.description}
      />
      <TextField
        variant="outlined"
        error={!!formErrors.value}
        helperText={formErrors.value}
        color="secondary"
        label="value"
        name="value"
        value={formFields.value}
        onChange={handleFormFieldChange}
      />
      <WalletField
        onWalletChange={handleFormFieldChange}
        walletName={formFields.walletName}
        wallets={wallets}
        errorText={formErrors.walletName}
      />
      <CategoryField
        onCategoryChange={handleFormFieldChange}
        categoryName={formFields.categoryName}
        categories={categories}
        errorText={formErrors.categoryName}
      />
      <TextField
        variant="outlined"
        error={!!formErrors.timestamp}
        helperText={formErrors.timestamp}
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
