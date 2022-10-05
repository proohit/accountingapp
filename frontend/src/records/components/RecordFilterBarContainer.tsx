import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import dayjs from 'dayjs';
import React, { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { currentFilterState } from '../hooks/currentQueryState';
import { filterRecordDialogState } from '../hooks/recordsDialogsState';
import { getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { WalletField } from './WalletField';
import { DatePicker } from '@mui/x-date-pickers';

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
  const setCurrentFilters = useSetRecoilState(currentFilterState);
  const setFilterRecordsDialog = useSetRecoilState(filterRecordDialogState);
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('all');
  const [walletName, setWalletName] = useState('all');

  const [timestampFrom, setTimestampFrom] = useState(null);
  const [timestampTo, setTimestampTo] = useState(null);
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery();
  const { data: wallets, isLoading: walletsLoading } = useWalletsQuery();

  const { classes } = styles();

  const applyFilter = () => {
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
    setDescription('');
    setWalletName('all');
    setCategoryName('all');
    setTimestampFrom(null);
    setTimestampTo(null);
    setCurrentFilters({
      description: undefined,
      categoryId: undefined,
      timestampFrom: undefined,
      timestampTo: undefined,
      walletId: undefined,
    });
  };

  if (categoriesLoading || walletsLoading) {
    return <LinearProgress />;
  }

  return (
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
          description={description}
          onDescriptionChange={(event) =>
            setDescription(event.target.value || event.currentTarget.value)
          }
        />
      </Grid>
      <Grid item>
        <WalletField
          withAll
          walletName={walletName}
          onWalletChange={(event) => setWalletName(event.target.value)}
          wallets={wallets}
        />
      </Grid>
      <Grid item>
        <CategoryField
          withAll
          categoryName={categoryName}
          onCategoryChange={setCategoryName}
          categories={categories}
          withNew={false}
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
          value={timestampFrom}
          onChange={setTimestampFrom}
          maxDate={dayjs(timestampTo)}
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
          value={timestampTo}
          onChange={setTimestampTo}
          minDate={dayjs(timestampFrom)}
        />
      </Grid>
      <Grid item xs container justifyContent="space-around">
        <Button variant="outlined" color="primary" onClick={resetFilter}>
          Reset
        </Button>
        <Button variant="contained" color="secondary" onClick={applyFilter}>
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};
