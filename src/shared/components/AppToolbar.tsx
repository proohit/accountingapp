import {
  AppBar,
  Button,
  Grid,
  Hidden,
  Toolbar,
  Typography,
} from '@material-ui/core';
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
          <Grid item container alignItems="center" xs={6}>
            {authenticated && (
              <Hidden lgUp>
                <MobileMenuButton />
              </Hidden>
            )}
            <Typography component="span" variant="h5">
              Accounting App
            </Typography>
          </Grid>
          <Grid item container alignItems="center" xs justify="flex-end">
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
      </Toolbar>
    </AppBar>
  );
};
