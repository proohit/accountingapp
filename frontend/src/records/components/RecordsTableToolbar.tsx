import { Grid, Hidden, IconButton, Tooltip } from '@material-ui/core';
import { AddBox, FilterList, GetApp, Sort } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { RecordHeader } from './RecordHeader';

type RecordsTableToolbarProps = {
  onFilterClicked: () => void;
  onAddClicked: () => void;
  onSortClicked: () => void;
  onExportClicked: () => void;
};
export const RecordsTableToolbar: FunctionComponent<RecordsTableToolbarProps> = (
  props
) => {
  const {
    onAddClicked,
    onFilterClicked,
    onSortClicked,
    onExportClicked,
  } = props;
  return (
    <>
      <Grid item container xs>
        <RecordHeader />
        <Grid item xs container justify="flex-end">
          <Hidden mdUp>
            <Tooltip title="Sort">
              <IconButton onClick={onSortClicked} color="primary">
                <Sort />
              </IconButton>
            </Tooltip>
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
          <Tooltip title="Export">
            <IconButton
              onClick={onExportClicked}
              color="primary"
              aria-label="export"
            >
              <GetApp />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};
