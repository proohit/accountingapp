import { makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import { AuthenticationProvider } from './authentication/components/AuthenticationProvider';
import { NavigationBar } from './shared/components/NavigationBar';
import { AccTheme } from './shared/globals/styles/AccTheme';
import { ApplicationRouter } from './shared/components/ApplicationRouter';

const mainStyles = makeStyles((theme) => ({
  appbarSeperator: {
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = mainStyles();
  return (
    <>
      <ThemeProvider theme={AccTheme}>
        <AuthenticationProvider>
          <header>
            <NavigationBar />
          </header>
          <main>
            <div className={classes.appbarSeperator} />
            <ApplicationRouter />
          </main>
        </AuthenticationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
