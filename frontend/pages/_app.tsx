import { Grid, makeStyles } from '@material-ui/core';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';
import Authenticated from '../src/authentication/components/Authenticated';
import { AppToolbar } from '../src/shared/components/AppToolbar';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import NotificationBar from '../src/shared/components/NotificationBar';
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
  const isAuthenticationRoute =
    router.route === '/login' || router.route === '/register';
  return (
    <Providers>
      <Authenticated>
        <AppToolbar />
        <div className={classes.appBar} />
        <Grid container>
          <NotificationBar />
          {!isAuthenticationRoute && (
            <Grid item lg={2}>
              <NavigationBar />
            </Grid>
          )}
          <Grid
            container
            item
            lg={isAuthenticationRoute ? 12 : 10}
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
