import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid } from '@material-ui/core';
import React from 'react';

export interface IACCDialogProps<T> extends DialogProps {
    confirmButton?: React.ReactNode;
    cancelButton?: React.ReactNode;
    confirmClickhandler?(item: T): void;
    onCancel?(): void;
    item?: T;
}

export default class ACCDialog<T> extends React.Component<IACCDialogProps<T>, {}> {
    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center" alignItems="center">
                        {this.props.children}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {this.props.confirmButton}
                    {this.props.cancelButton}
                </DialogActions>
            </Dialog>

        )
    }
}