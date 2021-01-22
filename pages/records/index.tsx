import { Grid, makeStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { RecordDialogContainer } from '../../src/records/components/RecordDialogContainer';
import { RecordFilterBarContainer } from '../../src/records/components/RecordFilterBarContainer';
import { RecordHeader } from '../../src/records/components/RecordHeader';
import { RecordListContainer } from './RecordListContainer';

const styles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(10),
  },
  filterBar: {
    paddingLeft: theme.spacing(2),
  },
}));

const RecordPage: FunctionComponent = (props) => {
  const classes = styles();

  return (
    <>
      <Grid item xs={9} className={classes.list}>
        <RecordHeader />
        <RecordDialogContainer />
        <RecordListContainer />
      </Grid>
      <Grid item xs={3} className={classes.filterBar}>
        <RecordFilterBarContainer />
      </Grid>
    </>
  );
};

export default RecordPage;
