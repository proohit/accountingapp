import {
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  SvgIcon,
  SwipeableDrawer,
  Typography,
  useTheme,
} from '@mui/material';
import {
  AccountBalance,
  Dashboard,
  MonetizationOn,
  Person,
  Replay,
  Settings,
} from '@mui/icons-material';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import packageJson from '../../../package.json';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import Routes from '../constants/Routes';
import { mobileDrawerOpenState } from '../hooks/mobileDrawerOpenState';
import AppIconSvg from './AppIconSvg';
import NavigationLinkItem from './NavigationLinkItem';

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);
export const NavigationBar: FunctionComponent = () => {
  const { palette } = useTheme();
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

  const handleLinkClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const [mobileOpen, setMobileOpen] = useRecoilState(mobileDrawerOpenState);

  const drawer = (
    <List>
      <Hidden lgUp>
        <ListItem>
          <SvgIcon style={{ fontSize: 32 }}>
            <AppIconSvg
              textColor={palette.primary.main}
              backgroundColor={palette.background.paper}
            />
          </SvgIcon>
          <Typography variant="h6">Accounting App</Typography>
        </ListItem>
        <Divider />
      </Hidden>
      <ListItem alignItems="center" style={{ justifyContent: 'center' }}>
        <Person color="primary" fontSize="large" />
        <Typography
          color="primary"
          display="inline"
          variant="h4"
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'normal',
            maxWidth: 250,
          }}
        >
          {username}
        </Typography>
      </ListItem>
      <NavigationLinkItem
        icon={<Dashboard color="primary" />}
        link={Routes.DASHBOARD}
        text="Dashboard"
        active={getCurrentRoute() === Routes.DASHBOARD}
        onClick={handleLinkClick}
      />
      <NavigationLinkItem
        icon={<MonetizationOn color="primary" />}
        link={Routes.RECORDS}
        text="Records"
        active={getCurrentRoute() === Routes.RECORDS}
        onClick={handleLinkClick}
      >
        <NavigationLinkItem
          icon={<Replay color="primary" />}
          link={Routes.RECURRENT_RECORDS}
          text="Recurrent Records"
          active={getCurrentRoute() === Routes.RECURRENT_RECORDS}
          onClick={handleLinkClick}
        />
      </NavigationLinkItem>

      <NavigationLinkItem
        icon={<AccountBalance color="primary" />}
        link={Routes.WALLETS}
        text="Wallets"
        active={getCurrentRoute() === Routes.WALLETS}
        onClick={handleLinkClick}
      />
      <Divider />
      <NavigationLinkItem
        icon={<Settings color="primary" />}
        link={Routes.SETTINGS}
        text="Settings"
        active={getCurrentRoute() === Routes.SETTINGS}
        onClick={handleLinkClick}
      />
      <ListItem alignItems="flex-start">
        <Typography variant="body2"> v{packageJson.version}</Typography>
      </ListItem>
    </List>
  );
  return username ? (
    <>
      <Hidden lgUp>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={() => setMobileOpen(false)}
          anchor="left"
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden lgDown>
        <Grid item>{drawer}</Grid>
      </Hidden>
    </>
  ) : (
    <Fragment />
  );
};
