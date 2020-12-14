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
import React, { FunctionComponent } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import LoginListItem from './LoginListItem';
import LogoutListItem from './LogoutListItem';
import NavigationLinkItem from './NavigationLinkItem';

const styles = makeStyles((theme) => ({
  drawer: {
    height: '100vh',
    position: 'sticky',
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
      <List>
        <NavigationLinkItem
          icon={<Dashboard />}
          link="/home"
          text="Dashboard"
        />
        <NavigationLinkItem
          icon={<MonetizationOn />}
          link="/records"
          text="Records"
        />
        <NavigationLinkItem icon={<Payment />} link="/wallets" text="Wallets" />
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
