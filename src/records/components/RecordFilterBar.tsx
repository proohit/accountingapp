import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
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
import { timestampFormat } from './timestampFormat';
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
  const [timestampFrom, setTimestampFrom] = useState(
    dayjs(new Date()).subtract(1, 'month').format(timestampFormat)
  );
  const [timestampTo, setTimestampTo] = useState(
    dayjs(new Date()).format(timestampFormat)
  );

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const classes = styles();

  const triggerFilter = () =>
    setFilter({
      description,
      categoryId: getCategoryByName(categories, categoryName)?.id,
      walletId: getWalletByName(wallets, walletName)?.id,
      timestampFrom,
      timestampTo,
    });

  return (
    <Paper className={classes.filterBar}>
      <Grid container direction="column" className={classes.filterBar}>
        <Typography align="center" variant="h6">
          Filters
        </Typography>
        <Divider />
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
        <TextField
          variant="outlined"
          color="secondary"
          label="timestampFrom"
          name="timestampFrom"
          value={timestampFrom}
          onChange={(event) => {
            setTimestampFrom(dayjs(event.target.value).format(timestampFormat));
          }}
          type="datetime-local"
          fullWidth
        />
        <TextField
          variant="outlined"
          color="secondary"
          label="timestampTo"
          name="timestampTo"
          value={timestampTo}
          onChange={(event) => {
            setTimestampTo(dayjs(event.target.value).format(timestampFormat));
          }}
          type="datetime-local"
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={triggerFilter}>
          Filter
        </Button>
      </Grid>
    </Paper>
  );
};
