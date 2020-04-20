import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from '@material-ui/core';
import { AccountBalance, Assignment, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

interface INavDrawerProps {}

const routes = {
  records: '/records',
  wallets: '/wallets',
};

const NavigationDrawerStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: '25%',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  };
});

const NavigationDrawer: React.FunctionComponent<INavDrawerProps> = (props) => {
  const history = useHistory();
  const classes = NavigationDrawerStyles();
  const [open, setOpen] = useState<boolean>(false);

  const reloadRoute = (route: string) => {
    history.push({ pathname: '/empty' });
    history.replace({ pathname: route });
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)} data-testid='menubutton'>
        <Menu />
      </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={true}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor='left'
        classes={{ paper: classes.drawer }}
      >
        <List classes={{ root: classes.list }}>
          <ListItemText primary='AccountingApp'></ListItemText>

          <Divider />

          <Link to={routes.records} onClick={() => reloadRoute(routes.records)}>
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary='Records'></ListItemText>
            </ListItem>
          </Link>

          <Link to={routes.wallets} onClick={() => reloadRoute(routes.wallets)}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary='Wallets'></ListItemText>
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default NavigationDrawer;
