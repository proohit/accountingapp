import React from 'react'
import { Container, Typography, Grid, Fab, Grow, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Record from './Record'
import config from '../config.js'
import { AddCircleOutlined, AddCircle, NoteAdd, ReplayOutlined } from '@material-ui/icons'
import MUIDataTable from 'mui-datatables'
import { AddRecordDialog } from './AddRecordDialog'
import CustomToolbar from './CustomToolbar'

export default class RecordView extends React.Component {
    constructor(props) {
        super();
        this.state = {
            records: [],
            addModal: false
        }
    }
    fetchItems = () => {
        this.props.functionSet.toggleLoading();

        const params = {
            headers: { "Authorization": this.props.token, "Content-Type": 'application/json' },
            method: 'GET'
        }

        fetch(config.api + '/records', params)
            .then(res => res.json())
            .then(records => {
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
    closeDialog = () => {
        this.setState({ addModal: false })
    }
    deleteRecords = (rows) => {
        const deleteParam = { method: 'DELETE', headers: { "Authorization": this.props.token, "Content-Type": 'application/json' } }
        rows.data.forEach(async row => {
            const res = await fetch(config.api + '/records/' + this.state.records[row.index].id, deleteParam)
            const result = await res.json();
            if (!result.success) {

            } else {
                const newRecords = this.state.records.filter(rec => !(rec.id === this.state.records[row.index].id))
                this.setState({ records: newRecords })
            }
        })
        this.props.functionSet.openAlert(<Alert severity="success">deleted records</Alert>)
    }
    componentDidMount() {
        this.props.functionSet.changeHeader('Records');
        this.props.functionSet.toggleLoading();

        this.fetchItems();
    }

    render() {
        const records = this.state.records.map(record => {
            let item = {};
            item.description = record.description;
            item.id = record.id;
            item.value = record.value;
            item.wallet = record.wallet;
            const date = new Date(record.timestamp);
            const year = date.getFullYear();
            let month = (date.getMonth() + 1).toString();
            month = month.length < 2 ? '0' + month : month
            let day = date.getDate().toString();
            day = day.length < 2 ? '0' + day : day

            let hour = date.getHours().toString();
            hour = hour.length < 2 ? '0' + hour : hour
            let minutes = date.getMinutes().toString();
            minutes = minutes.length < 2 ? '0' + minutes : minutes
            let seconds = date.getSeconds().toString();
            seconds = seconds.length < 2 ? '0' + seconds : seconds
            item.timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
            return item;
        })
        return (
            <Container>
                <AddRecordDialog refreshRecords={this.fetchItems} token={this.props.token} open={this.state.addModal} functionSet={this.props.functionSet} closeDialog={this.closeDialog} />
                <MUIDataTable
                    title={""}
                    data={records}
                    columns={["description", "value", "timestamp", "wallet"]}
                    options={{
                        onRowsDelete: this.deleteRecords,
                        responsive: "scrollFullHeight",
                        customToolbar: () => <CustomToolbar refresh={this.fetchItems} />,
                        rowHover: true,
                        searchOpen: true,

                    }}
                />
                <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                    <Fab onClick={() => this.setState({ addModal: true })} style={{ position: 'fixed', right: 25, bottom: 25 }} color="primary" aria-label="add">
                        <NoteAdd />
                    </Fab>
                </Grid>
            </Container>
        )
    }
}