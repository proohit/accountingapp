import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import { AccountBox, ExitToApp } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import LogoutButton from './LogoutButton';

export const NavigationBar: FunctionComponent = () => {
  const { logout, authenticated } = useAuthentication();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container direction="row">
          <Grid item container justify="flex-end">
            <IconButton>
              {authenticated ? (
                <LogoutButton logout={logout} />
              ) : (
                <AccountBox />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
