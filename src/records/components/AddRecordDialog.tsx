import moment from '@date-io/moment';
import { Button, TextField } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React from 'react';
import ACCDialog, { IACCDialogProps } from '../../shared/dialog/ACCDialog';
import Record from '../models/Record';

interface IAddRecordDialogState {
    descriptionValue: string
    valueValue: number;
    timestampValue: string;
    walletValue: string;
}

export default class AddRecordDialog extends React.Component<IACCDialogProps<Record>, IAddRecordDialogState> {
    state: IAddRecordDialogState = {
        descriptionValue: '',
        timestampValue: new moment().format(new moment().date(), 'YYYY-MM-DD HH:mm:ss'),
        valueValue: 0,
        walletValue: '',
    }
    handleDateChange = (event: MaterialUiPickersDate) => {
        if (event === null) return;
        this.setState({ timestampValue: event.format('YYYY-MM-DD HH:mm:ss') })
    }

    render() {
        let addButton = null;
        if (this.props.confirmClickhandler) {
            addButton = <Button onClick={() => this.props.confirmClickhandler!({ description: this.state.descriptionValue, value: this.state.valueValue, timestamp: this.state.timestampValue, wallet: this.state.walletValue })}>
                Add Record
            </Button>
        }
        const cancelButton = this.props.onCancel ?
            <Button onClick={this.props.onCancel}>
                Cancel
            </Button> : null
        return (
            <ACCDialog
                open={this.props.open}
                title="Add Record"
                confirmButton={addButton}
                cancelButton={cancelButton}>
                    <TextField label="Description" onChange={(e) => this.setState({ descriptionValue: e.target.value })}></TextField>
                    <TextField label="Value" onChange={(e) => this.setState({ valueValue: Number(e.target.value) })}></TextField>
                    <MuiPickersUtilsProvider utils={moment}>
                        <DateTimePicker value={this.state.timestampValue} onChange={this.handleDateChange} label="Timestamp" />
                    </MuiPickersUtilsProvider>
                    <TextField label="Wallet" onChange={(e) => this.setState({ walletValue: e.target.value })}></TextField>
            </ACCDialog>
        )
    }
}