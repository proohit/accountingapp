
import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import { Menu, AccountCircle } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'

export default class NavBar extends React.Component {
    navigateToLogin = () => {
        window.location.href = '/login'
    }
    render() {
        let accountButton = null;
        if (this.props.token) {
            accountButton =
                <IconButton edge="end" color="inherit">
                    <AccountCircle />
                </IconButton>
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
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{this.props.header}</Typography>
                    <Grid container direction='row' justify='flex-end'>
                        {accountButton}
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
