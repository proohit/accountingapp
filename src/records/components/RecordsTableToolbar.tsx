import { Grid, Tooltip, IconButton, Hidden } from '@material-ui/core';
import { AddBox, FilterList } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { RecordHeader } from './RecordHeader';

type RecordsTableToolbarProps = {
  onFilterClicked: () => void;
  onAddClicked: () => void;
};
export const RecordsTableToolbar: FunctionComponent<RecordsTableToolbarProps> = (
  props
) => {
  const { onAddClicked, onFilterClicked } = props;
  return (
    <>
      <Grid item xs={4}>
        <RecordHeader />
      </Grid>
      <Grid item container xs justify="flex-end">
        <Hidden mdUp>
          <Tooltip title="Filters">
            <IconButton onClick={onFilterClicked} color="primary">
              <FilterList />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Tooltip title="Add">
          <IconButton onClick={onAddClicked} color="primary" aria-label="add">
            <AddBox />
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};
