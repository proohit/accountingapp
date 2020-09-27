import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import { ApplicationRouter } from './shared/components/ApplicationRouter';
import { NavigationBar } from './shared/components/NavigationBar';
import Providers from './shared/components/Providers';

const mainStyles = makeStyles((theme) => ({
  appbarSeperator: {
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = mainStyles();
  return (
    <>
      <Providers>
        <header>
          <NavigationBar />
        </header>
        <main>
          <div className={classes.appbarSeperator} />
          <CssBaseline />
          <ApplicationRouter />
        </main>
      </Providers>
    </>
  );
}

export default App;
