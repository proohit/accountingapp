import { Grid, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import RecordList from '../../src/records/components/RecordList';

const RecordPage: FunctionComponent = (props) => {
  return (
    <>
      <Grid item xs={9}>
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
