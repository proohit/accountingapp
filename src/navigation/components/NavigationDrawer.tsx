import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";
import { AccountBalance, Assignment, Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRouter } from "../../shared/routes/router";

interface INavDrawerProps {}

const NavigationDrawerStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: "25%",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };
});

const NavigationDrawer: React.FunctionComponent<INavDrawerProps> = (props) => {
  const classes = NavigationDrawerStyles();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const recordsRoute = router.getRouteFrom("Records");
  const walletsRoute = router.getRouteFrom("Wallets");
  const dashboardRoute = router.getRouteFrom("Dashboard");

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)} data-testid="menubutton">
        <Menu />
      </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={true}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="left"
        classes={{ paper: classes.drawer }}
      >
        <List classes={{ root: classes.list }}>
          <ListItemText primary="AccountingApp"></ListItemText>

          <Divider />
          <NavLink
            onClick={toggleOpen}
            to={router.getLinkTo("Dashboard", { id: 2 })}
          >
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary={dashboardRoute!.name}></ListItemText>
            </ListItem>
          </NavLink>
          <Link onClick={toggleOpen} to={recordsRoute!.path}>
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary={recordsRoute!.name}></ListItemText>
            </ListItem>
          </Link>
          <Link onClick={toggleOpen} to={walletsRoute!.path}>
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary={walletsRoute!.name}></ListItemText>
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default NavigationDrawer;
