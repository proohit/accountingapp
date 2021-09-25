import { Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Category } from '../models/Category';
import { Periodicity, RecurrentRecord } from '../models/RecurrentRecord';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { ValueField } from './ValueField';
import { WalletField } from './WalletField';

const schema = (walletNames: string[]) =>
  yup.object().shape({
    description: yup.string(),
    walletName: yup
      .string()
      .required('Please provide a wallet')
      .oneOf(walletNames),
    categoryName: yup
      .string()
      .typeError('Please provide a category')
      .required('Please provide a category'),
    value: yup.number().required('Please provide a value'),
    startDate: yup.date().required('Please provide a starting date'),
    endDate: yup.date().nullable(),
    periodicity: yup
      .string()
      .required('Please provide how often the record should be executed')
      .oneOf(Object.values(Periodicity)),
  });

interface Props {
  recurrentRecord?: RecurrentRecord;
  wallets: Wallet[];
  categories: Category[];
  onAddRecurrentRecord: (recurrentRecord: RecurrentRecord) => void;
  username: string;
}

export const RecurrentRecordForm = (props: Props) => {
  const {
    recurrentRecord,
    onAddRecurrentRecord,
    categories,
    wallets,
    username,
  } = props;

  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        description: recurrentRecord?.description || '',
        value: recurrentRecord?.value.toString() || '',
        walletName:
          WalletUtils.getWalletById(wallets, recurrentRecord?.walletId)?.name ||
          (wallets?.length && wallets[0].name) ||
          '',
        categoryName:
          getCategoryById(categories, recurrentRecord?.categoryId)?.name ||
          (categories?.length > 0 && categories[0].name) ||
          '',
        startDate: dayjs(recurrentRecord?.startDate).format(),
        endDate: recurrentRecord?.endDate
          ? dayjs(recurrentRecord.endDate).format()
          : null,
        periodicity: recurrentRecord?.periodicity || Periodicity.MONTHLY,
      },
      validationSchema: schema(wallets?.map((wallet) => wallet.name)),
      validateOnChange: false,
      onSubmit: (submittedValues) => {
        onAddRecurrentRecord({
          id: recurrentRecord?.id || null,
          description: submittedValues.description,
          startDate: dayjs(submittedValues.startDate).toISOString(),
          endDate: submittedValues.endDate
            ? dayjs(submittedValues.endDate).toISOString()
            : null,
          value: Number(submittedValues.value),
          walletId: WalletUtils.getWalletByName(
            wallets,
            submittedValues.walletName
          )?.id,
          categoryId:
            getCategoryByName(categories, submittedValues.categoryName)?.id ||
            submittedValues.categoryName,
          periodicity: submittedValues.periodicity,
          ownerUsername: username,
        });
      },
    });

  return (
    <form onSubmit={handleSubmit} id="recurrent-record-form">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <DescriptionField
            description={values.description}
            onDescriptionChange={handleChange}
            errorText={errors.description}
          />
        </Grid>
        <Grid item>
          <ValueField
            errorText={errors.value}
            value={values.value}
            onValueChange={handleChange}
          />
        </Grid>
        <Grid item>
          <WalletField
            onWalletChange={handleChange}
            walletName={values.walletName}
            wallets={wallets}
            errorText={errors.walletName}
          />
        </Grid>
        <Grid item>
          <CategoryField
            onCategoryChange={(newCategory) => {
              setFieldValue('categoryName', newCategory);
            }}
            withNew={true}
            categoryName={values.categoryName}
            categories={categories}
            errorText={errors.categoryName}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="periodicity"
            name="periodicity"
            value={values.periodicity}
            onChange={handleChange}
            fullWidth
            error={!!errors.periodicity}
            helperText={errors.periodicity}
            color="secondary"
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            value={values.startDate}
            label="Start Date"
            name="startDate"
            color="secondary"
            onChange={(date) => {
              setFieldValue('startDate', date.format());
            }}
            fullWidth
            inputVariant="outlined"
            showTodayButton
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            value={values.endDate}
            label="End Date"
            name="endDate"
            color="secondary"
            onChange={(date) => {
              setFieldValue('endDate', date.format());
            }}
            fullWidth
            inputVariant="outlined"
            showTodayButton
            disablePast
            minDate={dayjs(values.startDate).format()}
          />
        </Grid>
      </Grid>
    </form>
  );
};
