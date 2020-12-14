import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { RecordHeader } from '../../src/records/components/RecordHeader';
import RecordList from '../../src/records/components/RecordList';

const styles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(10),
  },
}));

const RecordPage: FunctionComponent = (props) => {
  const classes = styles();

  return (
    <>
      <Grid item xs={9} className={classes.list}>
        <RecordHeader />
        <RecordList />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Typography>Filters</Typography>
      </Grid>
    </>
  );
};

export default RecordPage;
