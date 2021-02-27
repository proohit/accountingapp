import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import React, { FunctionComponent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { currentFilterState } from '../hooks/currentQueryState';
import { filterRecordDialogState } from '../hooks/recordsDialogsState';
import { getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { WalletField } from './WalletField';

const styles = makeStyles((theme) => ({
  filterBar: {
    padding: theme.spacing(2),
    gap: theme.spacing(3),
    position: 'sticky',
    overflow: 'auto',
    top: 70,
    bottom: 15,
  },
}));

export const RecordFilterBarContainer: FunctionComponent = (props) => {
  const { token } = useAuthentication();

  const [, setCurrentFilters] = useRecoilState(currentFilterState);
  const [, setFilterRecordsDialog] = useRecoilState(filterRecordDialogState);
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('all');
  const [walletName, setWalletName] = useState('all');

  const [timestampFrom, setTimestampFrom] = useState(null);
  const [timestampTo, setTimestampTo] = useState(null);
  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const classes = styles();

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

  return (
    <Grid container direction="column" className={classes.filterBar}>
      <Grid container item direction="row" alignItems="center">
        <IconButton onClick={resetFilter}>
          <Close />
        </IconButton>
        <Typography variant="h6">Filters</Typography>
        <Divider />
      </Grid>
      <DescriptionField
        description={description}
        onDescriptionChange={(event) =>
          setDescription(event.target.value || event.currentTarget.value)
        }
      />

      <WalletField
        withAll
        walletName={walletName}
        onWalletChange={(event) =>
          setWalletName(
            (event.target.value || event.currentTarget.value) as string
          )
        }
        wallets={wallets}
      />

      <CategoryField
        withAll
        categoryName={categoryName}
        onCategoryChange={setCategoryName}
        categories={categories}
        withNew={false}
      />
      <DateTimePicker
        inputVariant="outlined"
        value={timestampFrom}
        onChange={setTimestampFrom}
        label="From Timestamp"
        color="secondary"
        name="timestampFrom"
        fullWidth
        showTodayButton
        maxDate={dayjs(timestampTo)}
        maxDateMessage="From Timestamp should not be after To Timestamp"
      />
      <DateTimePicker
        inputVariant="outlined"
        value={timestampTo}
        onChange={setTimestampTo}
        minDate={dayjs(timestampFrom)}
        label="To Timestamp"
        color="secondary"
        name="timestampTo"
        fullWidth
        showTodayButton
        maxDateMessage="To Timestamp should not be before From Timestamp"
      />
      <Button variant="contained" color="secondary" onClick={applyFilter}>
        Filter
      </Button>
    </Grid>
  );
};
