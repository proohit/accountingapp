import { Grid, Hidden, makeStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { RecordDialogContainer } from '../../src/records/components/RecordDialogContainer';
import { RecordFilterBarContainer } from '../../src/records/components/RecordFilterBarContainer';
import { RecordListContainer } from '../../src/records/components/RecordListContainer';

const styles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const RecordPage: FunctionComponent = (props) => {
  const classes = styles();

  return (
    <>
      <Grid item xs className={classes.list} container direction="column">
        <RecordDialogContainer />
        <RecordListContainer />
      </Grid>
      <Hidden smDown>
        <Grid item xs={3}>
          <RecordFilterBarContainer />
        </Grid>
      </Hidden>
    </>
  );
};

export default RecordPage;
