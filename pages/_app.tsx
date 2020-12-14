import { Grid } from '@material-ui/core';
import type { AppProps } from 'next/app';
import React, { FunctionComponent } from 'react';
import Authenticated from '../src/authentication/components/Authenticated';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import Providers from '../src/shared/components/Providers';
import '../styles/globals.css';
import styles from '../styles/App.module.css';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Authenticated>
        <Grid container className={styles.pageContainer}>
          <Grid item xs={2}>
            <NavigationBar />
          </Grid>
          <Grid item xs={1} />
          <Grid container item xs={9}>
            <Component {...pageProps} />
          </Grid>
        </Grid>
      </Authenticated>
    </Providers>
  );
};

export default MyApp;
