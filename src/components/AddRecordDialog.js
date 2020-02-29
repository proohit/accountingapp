import moment from "@date-io/moment";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Component } from 'react';
import config from '../config';
import { params } from '../RequestBuilder';

// TODO make controlled so that input from textfields get inserted into state

export class AddRecordDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedWallet: '',
            description: '',
            value: '',
            timestamp: new Date(),
            walletError: false,
            valueError: false,
            descriptionError: false,
            timestampError: false,
        }
    }
    changeInput = (event) => {
        if (event.target.id === "description") {
            this.setState({ description: event.target.value })
        } else if (event.target.id === "value") {
            this.setState({ value: event.target.value })
        } else {
            this.setState({ selectedWallet: event.target.value })
        }
    }
    handleDateChange = (event) => {
        this.setState({ timestamp: event._i })
    }
    submit = async () => {
        let error = false;
        if (!this.state.selectedWallet || this.state.selectedWallet === '' || this.state.selectedWallet === undefined) {
            this.setState({ walletError: true })
            error = true;
        }
        if (!this.state.value || this.state.value === '' || this.state.value === undefined) {
            this.setState({ valueError: true })
            error = true;
        }
        if (!this.state.timestamp || this.state.timestamp === '' || this.state.value === undefined) {
            this.setState({ timestampError: true })
            error = true;
        }
        if (error) return;
        const year = this.state.timestamp.getFullYear();
        let month = (this.state.timestamp.getMonth() + 1).toString();
        month = month.length < 2 ? '0' + month : month
        let day = this.state.timestamp.getDate().toString();
        day = day.length < 2 ? '0' + day : day

        let hour = this.state.timestamp.getHours().toString();
        hour = hour.length < 2 ? '0' + hour : hour
        let minutes = this.state.timestamp.getMinutes().toString();
        minutes = minutes.length < 2 ? '0' + minutes : minutes
        let seconds = this.state.timestamp.getSeconds().toString();
        seconds = seconds.length < 2 ? '0' + seconds : seconds

        const timestampString = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`

        console.log(timestampString);
        try {
            const reqParams = params(this.props.token, 'POST', {
                description: this.state.description,
                value: parseInt(this.state.value, 10),
                wallet: this.state.selectedWallet,
                timestamp: timestampString
            })
            const res = await fetch(config.api + '/records', reqParams)
            const result = await res.json();
            console.log(result);
            if (result.success) {
                this.props.functionSet.openAlert(<Alert severity="success">Created Record</Alert>)
                this.props.refreshRecords();
            }
            this.props.closeDialog();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const wallets = this.props.wallets;
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Add new Record</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center">
                        <TextField id="description" onChange={this.changeInput} label="Description" />
                        <TextField error={this.state.valueError} id="value" onChange={this.changeInput} type="number" label="Value"></TextField>
                        <TextField error={this.state.walletError} id="wallet" onChange={this.changeInput} select label="Wallet" defaultValue=''>
                            {wallets.map(wallet =>
                                <MenuItem key={wallet.name} value={wallet.name}>
                                    {wallet.name}
                                </MenuItem>)}
                        </TextField>
                        <MuiPickersUtilsProvider utils={moment}>
                            <DateTimePicker error={this.state.timestampError} value={this.state.timestamp} onChange={this.handleDateChange} label="timestamp"></DateTimePicker>

                        </MuiPickersUtilsProvider>
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
