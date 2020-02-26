import React, { Component } from 'react'
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'

export class AddRecordDialog extends Component {

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Add new Record</DialogTitle>
                <DialogContent>
                    Test
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDialog}>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddRecordDialog
