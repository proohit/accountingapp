import React, { Component } from 'react'
import { SwipeableDrawer, Grid, Typography, IconButton, List, ListItem, Divider, ListItemText, ListItemIcon, } from '@material-ui/core'
import Login from './Login'
import RecordView from './RecordView'
import { Alert } from '@material-ui/lab'
import { Assignment } from '@material-ui/icons'

export class NavBarMenu extends Component {

    navigateToLogin = () => {
        this.props.functionSet.setContent(<Login changeToken={this.props.changeToken} functionSet={this.props.functionSet}></Login>)
        this.props.toggleDrawer();
    }
    navigateToRecords = () => {
        if (!this.props.token || this.props.token === null || this.props.token.length < 10) {
            this.props.functionSet.openAlert(<Alert severity="error">You must be logged in!</Alert>)
            this.navigateToLogin();
            return;
        }
        this.props.functionSet.setContent(<RecordView functionSet={this.props.functionSet} token={this.props.token} />)
        this.props.toggleDrawer();
    }
    render() {
        return (
            <SwipeableDrawer disableBackdropTransition={true} open={this.props.drawer} onClose={this.props.toggleDrawer} onOpen={this.props.toggleDrawer} anchor="left">
                <List>
                    <ListItem>
                        <ListItemText style={{ width: 200 }} primary="AccountingApp"></ListItemText>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem button onClick={this.navigateToRecords}>
                        <ListItemIcon><Assignment></Assignment></ListItemIcon>
                        <ListItemText primary="Records"></ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        )
    }
}

export default NavBarMenu
