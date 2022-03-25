import { Grid, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Head from 'next/head';
import React, { FunctionComponent } from 'react';
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
      <Head>
        <title>Records - AccountingApp</title>
        <meta
          property="og:title"
          content="Records - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Records overview in the AccountingApp."
          key="description"
        />
      </Head>
      <Grid item xs className={classes.list}>
        <RecordListContainer />
      </Grid>
      <Hidden mdDown>
        <Grid item xs={3}>
          <RecordFilterBarContainer />
        </Grid>
      </Hidden>
    </>
  );
};

export default RecordPage;
