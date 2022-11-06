import { CategoryDto, RecordDto, WalletDto } from '@accountingapp/shared';
import { Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { ValueField } from './ValueField';
import { WalletField } from './WalletField';

interface RecordFormProps {
  onSubmitRecord: (record: RecordDto) => void;
  wallets: WalletDto[];
  categories: CategoryDto[];
  owner: string;
  record?: RecordDto;
  withNewCategory?: boolean;
}

export const RecordSchema = (walletNames: string[]) =>
  yup.object().shape({
    description: yup.string().default(''),
    value: yup.number().required('Please provide a value'),
    walletName: yup
      .string()
      .required('Please provide a wallet')
      .oneOf(walletNames),
    categoryName: yup
      .string()
      .typeError('Please provide a category')
      .required('Please provide a category'),
    timestamp: yup.string().required('Please provide a timestamp'),
  });

export const RecordForm = (props: RecordFormProps) => {
  const {
    wallets,
    categories,
    owner,
    record,
    withNewCategory,
    onSubmitRecord,
  } = props;

  const {
    values: formFields,
    errors: formErrors,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
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
    validationSchema: RecordSchema(wallets?.map((wallet) => wallet.name)),
    validateOnChange: false,
    onSubmit: (submittedValues) => {
      onSubmitRecord({
        id: record?.id || null,
        description: submittedValues.description,
        timestamp: dayjs(submittedValues.timestamp).toISOString(),
        value: Number(submittedValues.value),
        walletId: WalletUtils.getWalletByName(
          wallets,
          submittedValues.walletName
        )?.id,
        categoryId:
          getCategoryByName(categories, submittedValues.categoryName)?.id ||
          submittedValues.categoryName,
        ownerUsername: owner,
      });
    },
  });

  return (
    <form onSubmit={handleSubmit} id="record-form">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <DescriptionField
            multiline
            description={formFields.description}
            onDescriptionChange={handleChange}
            errorText={formErrors.description}
          />
        </Grid>
        <Grid item>
          <ValueField
            onValueChange={handleChange}
            value={formFields.value}
            errorText={formErrors.value}
          />
        </Grid>
        <Grid item>
          <WalletField
            onWalletChange={handleChange}
            walletName={formFields.walletName}
            wallets={wallets}
            errorText={formErrors.walletName as string}
          />
        </Grid>
        <Grid item>
          <CategoryField
            onCategoryChange={(newCategory) => {
              setFieldValue('categoryName', newCategory);
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
            onChange={(date) => setFieldValue('timestamp', date)}
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                variant="outlined"
                color="secondary"
                label="timestamp"
                name="timestamp"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};
