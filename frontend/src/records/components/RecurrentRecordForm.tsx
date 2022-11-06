import { CategoryDto as Category, WalletDto } from '@accountingapp/shared';
import { Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Periodicity, RecurrentRecord } from '../models/RecurrentRecord';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { PeriodicityField } from './PeriodicityField';
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
    endDate: yup
      .date()
      .nullable()
      .min(yup.ref('startDate'), 'End date must be after start date'),
    periodicity: yup
      .string()
      .required('Please provide how often the record should be executed')
      .oneOf(Object.values(Periodicity)),
  });

interface Props {
  recurrentRecord?: RecurrentRecord;
  wallets: WalletDto[];
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
            onCategoryChange={(newCategory) =>
              setFieldValue('categoryName', newCategory)
            }
            withNew={true}
            categoryName={values.categoryName}
            categories={categories}
            errorText={errors.categoryName}
          />
        </Grid>
        <Grid item>
          <PeriodicityField
            onPeriodicityChange={(newPeriodicity) =>
              setFieldValue('periodicity', newPeriodicity.target.value)
            }
            periodicities={Object.values(Periodicity)}
            periodicityName={values.periodicity}
            errorText={errors.periodicity}
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                label="Start Date"
                name="startDate"
                color="secondary"
                error={!!errors.startDate}
                variant="outlined"
                fullWidth
                helperText={errors.startDate}
              />
            )}
            value={values.startDate}
            onChange={(date) => setFieldValue('startDate', date)}
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                label="End Date"
                name="endDate"
                color="secondary"
                error={!!errors.endDate}
                variant="outlined"
                fullWidth
                helperText={errors.endDate}
              />
            )}
            value={values.endDate}
            onChange={(date) => setFieldValue('endDate', date)}
            disablePast
            minDate={dayjs(values.startDate).format()}
          />
        </Grid>
      </Grid>
    </form>
  );
};
