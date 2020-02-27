import React, { Component } from 'react'
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, Grid, MenuItem } from '@material-ui/core'
import config from '../config';
import { params } from '../RequestBuilder';
import moment from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker, DateTimePicker } from '@material-ui/pickers'
import { string } from 'prop-types';
import { Alert } from '@material-ui/lab';

// TODO make controlled so that input from textfields get inserted into state

export class AddRecordDialog extends Component {
    constructor(props) {
        super();
        this.state = {
            wallets: [],
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
            if (result.success) {
                this.props.functionSet.openAlert(<Alert severity="success">Created Record</Alert>)
                console.log(result.message);
                this.props.refreshRecords();
            }
            this.props.closeDialog();
        } catch (error) {
            console.log(error);
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
