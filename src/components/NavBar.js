import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Grid, SwipeableDrawer, List, ListItem, ListItemText } from '@material-ui/core'
import { Menu, AccountCircle } from '@material-ui/icons'
import Login from './Login'
import RecordView from './RecordView'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    list: {
        width: '250px'
    },
    entry: {
        width: 250
    }
}

class NavBar extends React.Component {
    state = {
        drawer: false
    }
    toggleDrawer = () => {
        this.setState({ drawer: !this.state.drawer })
    }
    navigateToLogin = () => {
        this.props.functionSet.setContent(<Login changeToken={this.props.changeToken} functionSet={this.props.functionSet}></Login>)
    }
    navigateToRecords = () => {
        this.props.functionSet.setContent(<RecordView functionSet={this.props.functionSet} token={this.props.token} />)
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
                        <Typography variant="h6">
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
                <SwipeableDrawer style={{ width: 'auto' }} open={this.state.drawer} onClose={this.toggleDrawer} onOpen={this.toggleDrawer} anchor="left">
                    <List>
                        <ListItem button>
                            <ListItemText> test1 </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText> test2 </ListItemText>
                        </ListItem>
                    </List>
                    {/* <Typography className={useStyles.entry}></Typography> */}
                </SwipeableDrawer>
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer} edge="start" color="inherit">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">{this.props.header}</Typography>
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <IconButton onClick={this.navigateToRecords}>
                            <Typography color="inherit" variant="h6">
                                Records
                        </Typography>
                        </IconButton>
                    </Grid>
                    <Grid container direction='row' justify='flex-end'>
                        {accountButton}
                    </Grid>
                </Toolbar>
            </AppBar >
        );
    }
}
export default withStyles(styles)(NavBar)
