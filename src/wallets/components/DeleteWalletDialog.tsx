import { Button, Typography } from '@material-ui/core';
import React from 'react';
import ACCDialog, { IACCDialogProps } from '../../shared/dialog/ACCDialog';
import { Wallet } from '../models/Wallet';

export default class DeleteWalletDialog extends React.Component<IACCDialogProps<Wallet>, {}> {

    render() {
        return (
            <ACCDialog
                open={this.props.open}
                title="Delete Wallet"
                confirmButton={<Button onClick = {() => this.props.confirmClickhandler!(this.props.item!)}>Confirm</Button>}
                cancelButton={<Button onClick = {() => this.props.onCancel!()}>Cancel</Button>}>
                    <Typography variant="body1">
                        Are you sure you want to delete wallet {this.props.item!.name}? All records of this wallet will be deleted, too!
                    </Typography>
            </ACCDialog>
        )
    }

}