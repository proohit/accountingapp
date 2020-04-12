import { Button, TextField } from '@material-ui/core';
import React from 'react';
import ACCDialog, { IACCDialogProps } from '../../shared/dialog/ACCDialog';
import { Wallet } from '../models/Wallet';

interface IAddWalletDialogState {
    nameValue: string;
    balanceValue: number;
}

export default class AddWalletDialog extends React.Component<IACCDialogProps<Wallet>, IAddWalletDialogState> {

    render() {
        let addButton = null;
        if (this.props.confirmClickhandler) {
            addButton = <Button onClick={() => this.props.confirmClickhandler!({ name: this.state.nameValue, balance: this.state.balanceValue })}>
                Add Wallet
            </Button>
        }
        const cancelButton = this.props.onCancel ?
            <Button onClick={this.props.onCancel}>
                Cancel
            </Button> : null
        return (
            <ACCDialog
                open={this.props.open}
                title="Add Wallet"
                confirmButton={addButton}
                cancelButton={cancelButton}>
                    <TextField label="Name" onChange={(e) => this.setState({nameValue: e.target.value})}/>
                    <TextField label="Balance" type="number" onChange={(e)=> this.setState({balanceValue: Number(e.target.value)})}/>

            </ACCDialog>
        )
    }

}