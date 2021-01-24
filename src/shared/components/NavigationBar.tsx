import {
  Divider,
  Drawer,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import {
  Dashboard,
  MonetizationOn,
  Payment,
  Person,
  Settings,
} from '@material-ui/icons';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import Routes from '../constants/Routes';
import { mobileDrawerOpenState } from '../hooks/mobileDrawerOpenState';
import NavigationLinkItem from './NavigationLinkItem';

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
export const NavigationBar: FunctionComponent = () => {
  const { username } = useAuthentication();
  const router = useRouter();

  const getCurrentRoute = (): Routes => {
    switch (router.route) {
      case Routes.DASHBOARD:
        return Routes.DASHBOARD;
      case Routes.RECORDS:
        return Routes.RECORDS;
      case Routes.WALLETS:
        return Routes.WALLETS;
    }
  };

  const [mobileOpen, setMobileOpen] = useRecoilState(mobileDrawerOpenState);

  const drawer = (
    <List>
      <ListItem alignItems="center" style={{ justifyContent: 'center' }}>
        <Person color="primary" fontSize="large" />
        <Typography color="primary" display="inline" variant="h4">
          {username}
        </Typography>
      </ListItem>
      <NavigationLinkItem
        icon={<Dashboard />}
        link={Routes.DASHBOARD}
        text="Dashboard"
        active={getCurrentRoute() === Routes.DASHBOARD}
      />
      <NavigationLinkItem
        icon={<MonetizationOn />}
        link={Routes.RECORDS}
        text="Records"
        active={getCurrentRoute() === Routes.RECORDS}
      />
      <NavigationLinkItem
        icon={<Payment />}
        link={Routes.WALLETS}
        text="Wallets"
        active={getCurrentRoute() === Routes.WALLETS}
      />
      <Divider />
      <ListItem>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
  return username ? (
    <>
      <Hidden lgUp>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          anchor="left"
          PaperProps={{}}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Grid item>{drawer}</Grid>
      </Hidden>
    </>
  ) : (
    <Fragment />
  );
};
