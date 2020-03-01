import React, { Component } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { params } from '../RequestBuilder'
import config from '../config'
import { Alert } from '@material-ui/lab'
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
            const records = this.state.records.filter(rec => rec.wallet === wallet.name).sort((a, b) => a.timestamp > b.timestamp);
            return <WalletCard records={records} key={wallet.name} name={wallet.name} balance={wallet.balance} />
        })
        return (
            <List>
                {wallets}
            </List >
        )
    }
}

export default WalletView
