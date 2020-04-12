import { AppBar, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import { DataComponentProps } from '../../shared/BaseProps';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import NavigationDrawer from "./NavigationDrawer";
import AuthenticationContext, { AuthenticationContextValue } from "../../shared/context/AuthenticationContext";

type IState = {
    /**
     * Indicator if the drawer is active or not
     */
    drawer: boolean
}

interface INavBarProps extends DataComponentProps {
    title: string;
}

export default class NavBar extends React.Component<INavBarProps, IState> {
    context:AuthenticationContextValue = this.context;
    state: IState = {
        drawer: false
    }

    toggleDrawer = (open: boolean) => {
        this.setState({ drawer: open })
    }

    render() {
        console.log('renders NavBar');
        const accountNavigation = this.context.token?
        <LogoutButton functionSet={this.props.functionSet}/>:
        <LoginButton/>
        return (
            <AppBar position="static">
                <NavigationDrawer open={this.state.drawer} toggleDrawer={this.toggleDrawer} />
                <Toolbar>
                    <IconButton onClick={() => this.toggleDrawer(!this.state.drawer)} data-testid="menubutton">
                        <Menu />
                    </IconButton>
                    <Typography variant="h5">{this.props.title}</Typography>
                    <Grid container direction="row" justify='flex-end' alignItems="center">
                        {accountNavigation}
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}
NavBar.contextType = AuthenticationContext