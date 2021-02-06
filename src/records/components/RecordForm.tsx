import { Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from '../../shared/hooks/useForm';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { validateRecordField } from '../services/RecordValidator';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
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

  type RecordFormFields = Partial<Record> & {
    categoryName: string;
    walletName: string;
  };

  const [
    formFields,
    handleFormFieldChange,
    [formErrors, , isFormValid],
  ] = useForm<RecordFormFields>(
    {
      id: record?.id || null,
      description: record?.description || '',
      value: record?.value.toString() || '0.00',
      walletName:
        WalletUtils.getWalletById(wallets, record?.walletId)?.name ||
        (wallets?.length && wallets[0].name) ||
        '',
      categoryName:
        getCategoryById(categories, record?.categoryId)?.name ||
        (categories?.length > 0 && categories[0].name) ||
        '',
      timestamp: dayjs(record?.timestamp).format(),
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
      walletId: WalletUtils.getWalletByName(wallets, formFields.walletName)?.id,
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
      <DateTimePicker
        value={formFields.timestamp}
        label="timestamp"
        name="timestamp"
        color="secondary"
        onChange={(date) => {
          handleFormFieldChange(null, 'timestamp', date.format());
        }}
        fullWidth
        inputVariant="outlined"
        showTodayButton
      />
    </Grid>
  );
};
