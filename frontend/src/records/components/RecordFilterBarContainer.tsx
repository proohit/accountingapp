import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { FunctionComponent, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { makeStyles } from 'tss-react/mui';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { currentFilterState } from '../hooks/currentQueryState';
import { filterRecordDialogState } from '../hooks/recordsDialogsState';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { WalletField } from './WalletField';

const styles = makeStyles()((theme) => ({
  filterBar: {
    padding: theme.spacing(2),
    position: 'sticky',
    overflow: 'auto',
    top: 70,
    bottom: 15,
  },
}));

export const RecordFilterBarContainer: FunctionComponent = (props) => {
  const [currentFilters, setCurrentFilters] =
    useRecoilState(currentFilterState);
  const setFilterRecordsDialog = useSetRecoilState(filterRecordDialogState);
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();
  const { data: wallets, isLoading: walletsLoading } = useWalletsQuery();

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      walletName: 'all',
      categoryName: 'all',
      description: '',
      timestampFrom: null,
      timestampTo: null,
    },
    onSubmit: (values) => {
      applyFilter(
        values.description,
        values.walletName,
        values.categoryName,
        values.timestampFrom,
        values.timestampTo
      );
    },
  });

  useEffect(() => {
    setValues({
      walletName:
        WalletUtils.getWalletById(wallets, currentFilters.walletId)?.name ||
        'all',
      categoryName:
        getCategoryById(categories, currentFilters.categoryId)?.name || 'all',
      description: currentFilters.description || '',
      timestampFrom: currentFilters.timestampFrom || null,
      timestampTo: currentFilters.timestampTo || null,
    });
  }, [categories, wallets, currentFilters, setValues]);

  const { classes } = styles();

  const applyFilter = (
    description: string,
    walletName: string,
    categoryName: string,
    timestampFrom: string,
    timestampTo: string
  ) => {
    setCurrentFilters({
      description,
      categoryId: getCategoryByName(categories, categoryName)?.id,
      walletId: WalletUtils.getWalletByName(wallets, walletName)?.id,
      timestampFrom:
        timestampFrom && dayjs(timestampFrom).format('YYYY-MM-DDTHH:mm:ss'),
      timestampTo:
        timestampTo && dayjs(timestampTo).format('YYYY-MM-DDTHH:mm:ss'),
    });
    setFilterRecordsDialog({ open: false });
  };

  const resetFilter = () => {
    resetForm();
    applyFilter('', 'all', 'all', null, null);
  };

  if (categoriesLoading || walletsLoading) {
    return <LinearProgress />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        className={classes.filterBar}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6" align="center">
            Filter Records
          </Typography>
        </Grid>
        <Divider />
        <Grid item>
          <DescriptionField
            description={values.description}
            onDescriptionChange={handleChange}
          />
        </Grid>
        <Grid item>
          <WalletField
            withAll
            walletName={values.walletName}
            onWalletChange={handleChange}
            wallets={wallets}
          />
        </Grid>
        <Grid item>
          <CategoryField
            withAll
            categoryName={values.categoryName}
            onCategoryChange={(newCategoryName) =>
              setFieldValue('categoryName', newCategoryName)
            }
            categories={categories}
          />
        </Grid>
        <Grid item>
          <DatePicker
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                name="timestampFrom"
                label="From Timestamp"
                color="secondary"
                variant="outlined"
              />
            )}
            value={values.timestampFrom}
            onChange={(date) => setFieldValue('timestampFrom', date)}
            maxDate={dayjs(values.timestampTo)}
          />
        </Grid>
        <Grid item>
          <DatePicker
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                name="timestampTo"
                label="To Timestamp"
                color="secondary"
                variant="outlined"
              />
            )}
            value={values.timestampTo}
            onChange={(date) => setFieldValue('timestampTo', date)}
            minDate={dayjs(values.timestampFrom)}
          />
        </Grid>
        <Grid item xs container justifyContent="space-around">
          <Button variant="outlined" color="primary" onClick={resetFilter}>
            Reset
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Filter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
