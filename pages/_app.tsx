import { Grid, makeStyles } from '@material-ui/core';
import type { AppProps } from 'next/app';
import React, { FunctionComponent } from 'react';
import Authenticated from '../src/authentication/components/Authenticated';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import Providers from '../src/shared/components/Providers';
import styles from '../styles/App.module.css';
import '../styles/globals.css';
import { AppToolbar } from '../src/shared/components/AppToolbar';

const useStyles = makeStyles((theme) => ({
  appBar: {
    ...theme.mixins.toolbar,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const classes = useStyles();
  return (
    <Providers>
      <Authenticated>
        <AppToolbar />
        <div className={classes.appBar} />
        <Grid container>
          <Grid item lg={2}>
            <NavigationBar />
          </Grid>
          <Grid container item lg={10} className={classes.content}>
            <Component {...pageProps} />
          </Grid>
        </Grid>
      </Authenticated>
    </Providers>
  );
};

export default MyApp;
