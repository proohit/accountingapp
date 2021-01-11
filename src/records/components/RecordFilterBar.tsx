import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { getWalletByName } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { SearchQuery } from '../models/SearchQuery';
import { getCategoryByName } from '../utils/categoryUtils';

type RecordFilterBarProps = {
  filter: SearchQuery;
  setFilter: (newFilter: SearchQuery['filterBy']) => void;
};

const styles = makeStyles((theme) => ({
  filterBar: {
    padding: theme.spacing(2),
    gap: theme.spacing(3),
  },
}));
export const RecordFilterBar: FunctionComponent<RecordFilterBarProps> = (
  props
) => {
  const { filter, setFilter } = props;
  const { token } = useAuthentication();
  const [description, setDescription] = useState('');
  const [categoryName, setCategoryName] = useState('all');
  const [walletName, setWalletName] = useState('all');

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const classes = styles();

  return (
    <Paper>
      <Grid container direction="column" className={classes.filterBar}>
        <Typography align="center" variant="h6">
          Filters
        </Typography>
        <Divider />
        <TextField
          value={description}
          label={'description'}
          variant="outlined"
          onChange={(event) =>
            setDescription(event.target.value || event.currentTarget.value)
          }
        />
        <FormControl>
          <InputLabel>Wallet</InputLabel>
          <Select
            color="secondary"
            value={walletName}
            fullWidth
            name="walletName"
            onChange={(event) => setWalletName(event.target.value as string)}
          >
            <MenuItem key="all" value="all">
              All Wallets
            </MenuItem>
            {wallets &&
              wallets.map((wallet) => (
                <MenuItem key={wallet.name} value={wallet.name}>
                  {wallet.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            color="secondary"
            fullWidth
            value={categoryName}
            label="category"
            name="category"
            onChange={(event) => setCategoryName(event.target.value as string)}
          >
            <MenuItem key="all" value="all">
              All categories
            </MenuItem>
            {categories &&
              categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          onClick={() =>
            setFilter({
              description,
              categoryId: getCategoryByName(categories, categoryName)?.id,
              walletId: getWalletByName(wallets, walletName)?.id,
            })
          }
        >
          Filter
        </Button>
      </Grid>
    </Paper>
  );
};
