import React, { FunctionComponent } from 'react';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Providers from '../src/shared/components/Providers';
import Authenticated from '../src/authentication/components/Authenticated';
import { NavigationBar } from '../src/shared/components/NavigationBar';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  toolbarOffset: {
    ...theme.mixins.toolbar,
  },
}));

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const classes = styles();
  return (
    <Providers>
      <Authenticated>
        <NavigationBar />
        <main>
          <div className={classes.toolbarOffset} />
          <Component {...pageProps} />
        </main>
      </Authenticated>
    </Providers>
  );
};

export default MyApp;
