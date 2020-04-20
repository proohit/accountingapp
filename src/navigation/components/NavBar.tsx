import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { DataComponentProps } from '../../shared/BaseProps';
import AuthenticationContext from '../../shared/context/AuthenticationContext';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import NavigationDrawer from './NavigationDrawer';

interface INavBarProps extends DataComponentProps {
  title: string;
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const context = React.useContext(AuthenticationContext);

  const accountNavigation = context!.token ? (
    <LogoutButton functionSet={props.functionSet} />
  ) : (
    <LoginButton />
  );
  return (
    <AppBar position='static'>
      <Toolbar>
        <NavigationDrawer />

        <Typography variant='h5'>{props.title}</Typography>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          {accountNavigation}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
