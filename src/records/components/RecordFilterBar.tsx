import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import React, { FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { getWalletByName } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { SearchQuery } from '../models/SearchQuery';
import { getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { WalletField } from './WalletField';

type RecordFilterBarProps = {
  setFilter: (newFilter: SearchQuery['filterBy']) => void;
};

const styles = makeStyles((theme) => ({
  filterBar: {
    padding: theme.spacing(2),
    gap: theme.spacing(3),
    position: 'sticky',
    overflow: 'auto',
    top: theme.spacing(12),
  },
}));

export const RecordFilterBar: FunctionComponent<RecordFilterBarProps> = (
  props
) => {
  const { setFilter } = props;
  const { token } = useAuthentication();
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('all');
  const [walletName, setWalletName] = useState('all');

  const [timestampFrom, setTimestampFrom] = useState(null);
  const [timestampTo, setTimestampTo] = useState(null);
  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const classes = styles();

  const triggerFilter = () =>
    setFilter({
      description,
      categoryId: getCategoryByName(categories, categoryName)?.id,
      walletId: getWalletByName(wallets, walletName)?.id,
      timestampFrom:
        timestampFrom && dayjs(timestampFrom).format('YYYY-MM-DDTHH:mm:ss'),
      timestampTo:
        timestampTo && dayjs(timestampTo).format('YYYY-MM-DDTHH:mm:ss'),
    });

  const resetFilter = () => {
    setDescription('');
    setWalletName('all');
    setCategoryName('all');
    setTimestampFrom(null);
    setTimestampTo(null);
    setFilter({
      description: undefined,
      categoryId: undefined,
      timestampFrom: undefined,
      timestampTo: undefined,
      walletId: undefined,
    });
  };

  return (
    <Paper className={classes.filterBar}>
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
          onCategoryChange={(event) =>
            setCategoryName(
              (event.target.value || event.currentTarget.value) as string
            )
          }
          categories={categories}
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
        <Button variant="contained" color="secondary" onClick={triggerFilter}>
          Filter
        </Button>
      </Grid>
    </Paper>
  );
};
