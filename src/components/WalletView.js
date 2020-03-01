import { Grid, List, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { Component } from 'react'
import config from '../config'
import { params } from '../RequestBuilder'
import WalletCard from './WalletCard'

export class WalletView extends Component {
    state = {
        wallets: [],
        records: [],
    }

    async componentDidMount() {
        try {
            const reqParams = params(this.props.token, 'GET')
            const res = await fetch(config.api + "/wallets", reqParams);
            const result = await res.json();
            if (result.success) {
                this.setState({ wallets: result.message })
            } else {
                this.props.functionSet.openAlert(<Alert severity="error">Error retrieving wallets</Alert>)
                console.log(result.message);
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const reqParams = params(this.props.token, 'GET')
            const res = await fetch(config.api + "/records", reqParams);
            const result = await res.json();
            if (result.success) {
                this.setState({ records: result.message })
            } else {
                this.props.functionSet.openAlert(<Alert severity="error">Error retrieving records</Alert>)
                console.log(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const wallets = this.state.wallets.map(wallet => {
            const records = this.state.records.filter(rec => rec.wallet === wallet.name).sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
            return <WalletCard records={records} key={wallet.name + "_card"} name={wallet.name} balance={wallet.balance} />
        })
        return (
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Typography variant="h2">
                    Wallets
                </Typography>
                <List style={{ width: '90%' }}>
                    {wallets}
                </List >
            </Grid>
        )
    }
}

export default WalletView