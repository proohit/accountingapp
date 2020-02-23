import React from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Record from './Record'

export default class RecordView extends React.Component {
    state = {
        records: []
    }

    componentDidMount() {
        this.props.functionSet.changeHeader('Records');
        this.props.functionSet.toggleLoading();
        const params = {
            headers: { "Authorization": this.props.token, "Content-Type": 'application/json' },
            method: 'GET'
        }
        fetch('http://localhost:3000/records', params).then(res => res.json()).then(records => {
            if (records.success) {
                this.setState({ records: records.message })
            } else {
                this.props.functionSet.openAlert(<Alert severity='error'>{records.message}</Alert>)
            }
            this.props.functionSet.toggleLoading();
        }).catch(err => {
            console.log(err);
            this.props.functionSet.openAlert(<Alert severity='error'>oops, something went wrong retrieveing your records</Alert>)
            this.props.functionSet.toggleLoading();
        })
    }
    render() {
        const records = this.state.records.map(record => <Typography>{record.description}</Typography>)
        return (
            this.state.records.map(record => <Record description={record.description} value={record.value} id={record.id} />)
        )
    }
}