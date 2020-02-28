import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle, Menu } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import React from 'react'
import NavBarMenu from './NavBarMenu'
import Login from "./Login";

export default class NavBar extends React.Component {
    state = {
        drawer: false
    }
    navigateToLogin = () => {
        this.props.functionSet.setContent(<Login changeToken={this.props.changeToken} functionSet={this.props.functionSet}></Login>)
    }
    toggleDrawer = () => {
        this.setState({ drawer: !this.state.drawer })
    }
    removeToken = () => {
        this.props.changeToken(null)
        this.props.functionSet.openAlert(<Alert severity='success'>successfully logged out</Alert>)
        this.navigateToLogin();
    }
    render() {
        let accountButton = null;
        if (this.props.token) {
            accountButton =
                <div>
                    <IconButton edge="end" color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <IconButton onClick={this.removeToken}>
                        <Typography color="inherit" variant="h6">
                            Logout
                        </Typography>
                    </IconButton>
                </div>
        } else {
            accountButton =
                <IconButton onClick={this.navigateToLogin}>
                    <Typography color="inherit" variant="h6">
                        Login
                    </Typography>
                </IconButton>
        }
        return (
            <AppBar position="sticky">
                <NavBarMenu navigateToLogin={this.navigateToLogin} token={this.props.token} drawer={this.state.drawer} toggleDrawer={this.toggleDrawer} functionSet={this.props.functionSet} />
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer} edge="start" color="inherit">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{this.props.header}</Typography>

                    <Grid container direction='row' justify='flex-end'>
                        {accountButton}
                    </Grid>
                </Toolbar>
            </AppBar >
        );
    }
}
