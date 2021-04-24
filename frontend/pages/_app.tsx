import { Grid, makeStyles } from '@material-ui/core';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import Authenticated from '../src/authentication/components/Authenticated';
import { isAuthenticationRoute } from '../src/authentication/services/RoutingService';
import { AppToolbar } from '../src/shared/components/AppToolbar';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import Providers from '../src/shared/components/Providers';
import '../styles/globals.css';

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
  const router = useRouter();
  return (
    <Providers>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#3b4147" />
      </Head>
      <Authenticated>
        <AppToolbar />
        <div className={classes.appBar} />
        <Grid container>
          {!isAuthenticationRoute(router.route) && (
            <Grid item lg={2}>
              <NavigationBar />
            </Grid>
          )}
          <Grid
            container
            item
            lg={isAuthenticationRoute(router.route) ? 12 : 10}
            className={classes.content}
          >
            <Component {...pageProps} />
          </Grid>
        </Grid>
      </Authenticated>
    </Providers>
  );
};

export default MyApp;
