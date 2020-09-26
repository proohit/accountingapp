import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { AccountBox, ExitToApp } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';

export const NavigationBar: FunctionComponent = () => {
  const authentication = useAuthentication();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row">
          <Grid item container justify="flex-end">
            <IconButton>
              {authentication.authenticated ? <ExitToApp /> : <AccountBox />}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
