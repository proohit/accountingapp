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
import { ValueField } from './ValueField';
import { WalletField } from './WalletField';

interface RecordFormProps {
  onRecordChange(record: Record): void;
  onFormValidChanged(isFormValid: boolean): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
  record?: Record;
  withNewCategory?: boolean;
}

export const RecordForm = (props: RecordFormProps) => {
  const {
    onRecordChange,
    onFormValidChanged,
    wallets,
    categories,
    owner,
    record,
    withNewCategory,
  } = props;

  type RecordFormFields = Partial<Record> & {
    categoryName: string;
    walletName: string;
  };

  const [formFields, handleFormFieldChange, [formErrors, , isFormValid]] =
    useForm<RecordFormFields>(
      {
        description: record?.description || '',
        value: record?.value.toString() || '',
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
      id: record?.id || null,
      description: formFields.description,
      timestamp: dayjs(formFields.timestamp).toISOString(),
      value: Number(formFields.value),
      walletId: WalletUtils.getWalletByName(wallets, formFields.walletName)?.id,
      categoryId:
        getCategoryByName(categories, formFields.categoryName)?.id ||
        formFields.categoryName,
      ownerUsername: owner,
    });
  }, [formFields]);

  useEffect(() => {
    onFormValidChanged(isFormValid);
  }, [isFormValid]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <DescriptionField
          description={formFields.description}
          onDescriptionChange={handleFormFieldChange}
          errorText={formErrors.description}
        />
      </Grid>
      <Grid item>
        <ValueField
          onValueChange={handleFormFieldChange}
          value={formFields.value}
          errorText={formErrors.value}
        />
      </Grid>
      <Grid item>
        <WalletField
          onWalletChange={handleFormFieldChange}
          walletName={formFields.walletName}
          wallets={wallets}
          errorText={formErrors.walletName}
        />
      </Grid>
      <Grid item>
        <CategoryField
          onCategoryChange={(newCategory) => {
            handleFormFieldChange(null, 'categoryName', newCategory);
          }}
          withNew={withNewCategory}
          categoryName={formFields.categoryName}
          categories={categories}
          errorText={formErrors.categoryName}
        />
      </Grid>
      <Grid item>
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
    </Grid>
  );
};
