import React from 'react'
import ACCDialog, { IACCDialogProps } from '../../shared/dialog/ACCDialog'
import { Wallet } from '../models/Wallet'
import { Button, TextField } from '@material-ui/core'


interface IEditWalletDialogState {
    nameValue: string;
    balanceValue: number;
}

export default class EditWalletDialog extends React.Component<IACCDialogProps<Wallet>, IEditWalletDialogState> {
    state: IEditWalletDialogState = {
        nameValue: this.props.item!.name,
        balanceValue: this.props.item!.balance
    }
    render() {
        return (
            <ACCDialog
                open={this.props.open}
                confirmButton={<Button onClick={() => this.props.confirmClickhandler!({ name: this.state.nameValue, balance: this.state.balanceValue })}>Confirm</Button>}
                cancelButton={<Button onClick={this.props.onCancel}>Cancel</Button>}
                title="Edit Wallet">
                <TextField label="Name" defaultValue={this.props.item?.name} onChange={(e) => this.setState({ nameValue: e.target.value })} />
                <TextField label="Balance" defaultValue={this.props.item?.balance} onChange={(e) => this.setState({ balanceValue: Number(e.target.value) })} />
            </ACCDialog>

        )
    }
} 