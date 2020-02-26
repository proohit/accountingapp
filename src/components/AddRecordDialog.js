import React, { Component } from 'react'
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, Grid } from '@material-ui/core'
import config from '../config';

// TODO make controlled so that input from textfields get inserted into state

export class AddRecordDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            wallets: [],
            selectedWallet: '',
            description: '',
            value: '',
        }
    }

    submit = async () => {
        try {

            this.props.closeDialog();
        } catch (error) {

        }
    }
    async componentDidMount() {
        try {
            const res = await fetch(config.api + '/wallets', { headers: { "Authorization": this.props.token, "Content-Type": 'application/json' }, method: 'GET' })
            const result = await res.json();
            this.setState({ wallets: result.message })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const wallets = this.state.wallets;
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Add new Record</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center">
                        <TextField label="Description" />
                        <TextField type="number" label="Value"></TextField>
                        <TextField select label="Wallet">
                            {wallets.map(wallet =>
                                <option key={wallet.name} value={wallet.name}>
                                    {wallet.name}
                                </option>)}
                        </TextField>

                    </Grid>
                    {/* <Select> Wallet</Select> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submit}>
                        create
                    </Button>
                    <Button onClick={this.props.closeDialog}>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddRecordDialog
