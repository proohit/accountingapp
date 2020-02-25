import React, { Component } from 'react'
import { SwipeableDrawer, Grid, Typography, IconButton, List, ListItem, Divider, } from '@material-ui/core'
import Login from './Login'
import RecordView from './RecordView'

export class NavBarMenu extends Component {

    navigateToLogin = () => {
        this.props.functionSet.setContent(<Login changeToken={this.props.changeToken} functionSet={this.props.functionSet}></Login>)
        this.props.toggleDrawer();
    }
    navigateToRecords = () => {
        this.props.functionSet.setContent(<RecordView functionSet={this.props.functionSet} token={this.props.token} />)
        this.props.toggleDrawer();
    }
    render() {
        return (
            <SwipeableDrawer open={this.props.drawer} onClose={this.props.toggleDrawer} onOpen={this.props.toggleDrawer} anchor="left">
                <List>
                    <ListItem>
                        <Typography style={{ width: 250 }} variant="h5">Accounting App</Typography>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                        <IconButton onClick={this.navigateToRecords}>
                            <Typography color="inherit" variant="h6">
                                Records
                            </Typography>
                        </IconButton>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        )
    }
}

export default NavBarMenu
