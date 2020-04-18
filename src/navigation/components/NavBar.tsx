import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { DataComponentProps } from "../../shared/BaseProps";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import NavigationDrawer from "./NavigationDrawer";
import AuthenticationContext, {
  AuthenticationContextValue,
} from "../../shared/context/AuthenticationContext";

interface INavBarProps extends DataComponentProps {
  title: string;
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const context = React.useContext(AuthenticationContext);
  const [drawer, setDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  const accountNavigation = context!.token ? (
    <LogoutButton functionSet={props.functionSet} />
  ) : (
    <LoginButton />
  );
  return (
    <AppBar position="static">
      <NavigationDrawer open={drawer} toggleDrawer={toggleDrawer} />
      <Toolbar>
        <IconButton onClick={toggleDrawer} data-testid="menubutton">
          <Menu />
        </IconButton>
        <Typography variant="h5">{props.title}</Typography>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {accountNavigation}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
