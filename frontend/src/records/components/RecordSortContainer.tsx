import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Order } from '../../shared/models/SortOrder';
import { currentSortState } from '../hooks/currentQueryState';
import { sortRecordDialogState } from '../hooks/recordsDialogsState';
import { Record } from '../models/Record';

const RecordSortContainer: React.FunctionComponent = (props) => {
  const [currentSort, setCurrentSort] = useRecoilState(currentSortState);
  const setSortRecordDialog = useSetRecoilState(sortRecordDialogState);

  const [selectedOrder, setSelectedOrder] = useState(currentSort.sortDirection);
  const [selectedSortBy, setSelectedSortBy] = useState(currentSort.sortBy);

  const updateSort = () => {
    setCurrentSort({ sortBy: selectedSortBy, sortDirection: selectedOrder });
    setSortRecordDialog({ open: false });
  };
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs>
        <FormControl variant="outlined">
          <InputLabel>Order</InputLabel>
          <Select
            color="secondary"
            value={selectedOrder}
            name="order"
            onChange={(event) => setSelectedOrder(event.target.value as Order)}
            label="Order"
          >
            <MenuItem key={Order.asc} value={Order.asc}>
              ascending
            </MenuItem>
            <MenuItem key={Order.desc} value={Order.desc}>
              descending
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <FormControl variant="outlined">
          <InputLabel>Order By</InputLabel>
          <Select
            color="secondary"
            value={selectedSortBy}
            name="order"
            label="Order By"
            onChange={(event) =>
              setSelectedSortBy(event.target.value as keyof Record)
            }
          >
            <MenuItem key={'description'} value={'description'}>
              Description
            </MenuItem>
            <MenuItem key={'value'} value={'value'}>
              Value
            </MenuItem>
            <MenuItem key={'wallet'} value={'wallet'}>
              Wallet
            </MenuItem>
            <MenuItem key={'category'} value={'category'}>
              Category
            </MenuItem>
            <MenuItem key={'timestamp'} value={'timestamp'}>
              Timestamp
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={updateSort}
        >
          Sort
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecordSortContainer;
