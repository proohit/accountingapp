import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import { AuthenticationProvider } from './authentication/components/AuthenticationProvider';
import Login from './authentication/components/Login';
import { NavigationBar } from './shared/components/NavigationBar';

const mainStyles = makeStyles((theme) => ({
  appbarSeperator: {
    ...theme.mixins.toolbar,
  },
}));

function App() {
  const classes = mainStyles();
  return (
    <>
      <AuthenticationProvider>
        <header>
          <NavigationBar />
        </header>
        <main>
          <div className={classes.appbarSeperator} />
          <Grid container direction="row" justify="center">
            <Login />
          </Grid>
        </main>
      </AuthenticationProvider>
    </>
  );
}

export default App;
