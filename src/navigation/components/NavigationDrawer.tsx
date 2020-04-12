import { Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from "@material-ui/core";
import { AccountBalance, Assignment } from "@material-ui/icons";
import React from 'react';
import { Link, RouteComponentProps, withRouter, Router } from 'react-router-dom';

interface INavDrawerProps {
    toggleDrawer(open: boolean): void;
    open: boolean
}

interface INavDrawerState {

}

const routes = {
    records: '/records',
    wallets: '/wallets'
}

const styles = {
    list: {
        width: 200
    },
    link: {
        textDecoration: 'none',
    }
}

class NavigationDrawer extends React.Component<INavDrawerProps & RouteComponentProps, INavDrawerState> {
    reloadRoute = (route: string) => {
        this.props.history.push({ pathname: '/empty' })
        this.props.history.replace({ pathname: route })
        this.props.toggleDrawer(false)
    }

    render() {
        return (
            <SwipeableDrawer
                disableBackdropTransition={true}
                open={this.props.open}
                onClose={() => this.props.toggleDrawer(false)}
                onOpen={() => this.props.toggleDrawer(true)}
                anchor="left">
                <List style={styles.list}>
                    <ListItem>
                        <ListItemText primary="AccountingApp"></ListItemText>
                    </ListItem>
                    <Divider></Divider>
                    <Link to={routes.records} onClick={() => this.reloadRoute(routes.records)} style={styles.link}>
                        <ListItem button>
                            <ListItemIcon><Assignment /></ListItemIcon>
                            <ListItemText primary="Records"></ListItemText>
                        </ListItem>
                    </Link>

                    <Link to={routes.wallets} onClick={() => this.reloadRoute(routes.wallets)} style={styles.link}>
                        <ListItem button >
                            <ListItemIcon><AccountBalance /></ListItemIcon>
                            <ListItemText primary="Wallets"></ListItemText>
                        </ListItem>
                    </Link>

                </List>
            </SwipeableDrawer>
        )
    }
}

export default withRouter(NavigationDrawer);