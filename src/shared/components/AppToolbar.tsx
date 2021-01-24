import { AppBar, Button, Grid, Hidden, Toolbar } from '@material-ui/core';
import { AccountBox, ExitToApp } from '@material-ui/icons';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { MobileMenuButton } from './MobileMenuButton';

export const AppToolbar: FunctionComponent = () => {
  const { authenticated, logout } = useAuthentication();
  return (
    <AppBar color="primary">
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            {authenticated && (
              <Hidden mdUp>
                <MobileMenuButton />
              </Hidden>
            )}
          </Grid>
          <Grid item>
            <Grid item container alignItems="center">
              {authenticated ? (
                <Button
                  color="secondary"
                  startIcon={<ExitToApp />}
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/login" passHref>
                  <Button
                    color="secondary"
                    component="a"
                    startIcon={<AccountBox />}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
