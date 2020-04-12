import React from 'react'
import { Alert } from '@material-ui/lab'
import { Alert as AlertModel } from './AlertModel'

interface Props {
    alert: AlertModel
}

export class TypedAlert extends React.Component<Props, {}> {
    render() {
        return (
            <Alert severity={this.props.alert.severity}>{this.props.alert.message}</Alert>
        )
    }
}



