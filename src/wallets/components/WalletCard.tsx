import { Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { Wallet } from '../models/Wallet';

interface IWalletCardProps {
    wallet: Wallet;
    deleteHandler(wallet: Wallet): void;
    editHandler(wallet: Wallet): void;
}

interface IWalletCardState {
}

const styles = {

    card: {
        width: '100%',
        marginTop: 10
    },
    expand: {
        marginLeft: 'auto'
    },
    expandOpen: {
        marginLeft: 'auto',
        transform: 'rotate(180deg)'
    }
}

class WalletCard extends React.Component<IWalletCardProps, IWalletCardState> {
    render() {
        return (
            <div>

                <Card style={styles.card}>
                    <CardHeader title={this.props.wallet.name} />
                    <CardContent>
                        <Typography variant="body2" component="p">
                            The balance of this wallet is {this.props.wallet.balance}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="edit wallet">
                            <IconButton onClick={() => this.props.editHandler(this.props.wallet)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="delete wallet">
                            <IconButton onClick={() => this.props.deleteHandler(this.props.wallet)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>

            </div>
        )
    }
}

export default withStyles(styles)(WalletCard)