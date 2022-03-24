import {
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
  Slide,
  SvgIcon,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AccountBox, ExitToApp } from '@mui/icons-material';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import AppIconSvg from './AppIconSvg';
import { MobileMenuButton } from './MobileMenuButton';

const useStyles = makeStyles((theme) => ({
  appBar: {
    ...theme.mixins.toolbar,
  },
}));

export const AppToolbar: FunctionComponent = () => {
  const { authenticated, logout } = useAuthentication();
  const trigger = useScrollTrigger({ threshold: 20 });
  const classes = useStyles();
  return <>
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar color="primary">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item container alignItems="center" xs>
              {authenticated && (
                <Hidden lgUp>
                  <MobileMenuButton />
                </Hidden>
              )}
              <SvgIcon style={{ fontSize: 48 }}>
                <AppIconSvg />
              </SvgIcon>
              <Typography variant="h6">Accounting App</Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              xs={1}
              justifyContent="flex-end"
            >
              {authenticated ? (
                <IconButton color="secondary" onClick={logout} size="large">
                  <ExitToApp />
                </IconButton>
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
    </Slide>
    <div className={classes.appBar} />
  </>;
};
