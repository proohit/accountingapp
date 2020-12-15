import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
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
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import Routes from '../constants/Routes';
import LoginListItem from './LoginListItem';
import LogoutListItem from './LogoutListItem';
import NavigationLinkItem from './NavigationLinkItem';

const styles = makeStyles((theme) => ({
  drawer: {
    height: '100vh',
    position: 'sticky',
    overflow: 'auto',
    top: 0,
  },
  header: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const NavigationBar: FunctionComponent = () => {
  const { logout, authenticated, username } = useAuthentication();
  const classes = styles();
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

  return (
    <Paper className={classes.drawer}>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="center"
        className={classes.header}
      >
        <Person fontSize="large" />
        <Typography variant="h4">{username}</Typography>
      </Grid>
      <Divider />
      <List disablePadding>
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
        {authenticated ? <LogoutListItem logout={logout} /> : <LoginListItem />}
      </List>
    </Paper>
  );
};
