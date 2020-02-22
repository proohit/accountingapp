
import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

export default class NavBar extends React.Component {
    render() {
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{this.props.header}</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
