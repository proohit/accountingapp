import { Container, Fab, Grid } from '@material-ui/core'
import { NoteAdd, AddBox, Check, Clear, DeleteOutline, Delete, ChevronRight, Edit, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, ArrowDownward, Remove, ViewColumn } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import MaterialTable from 'material-table'
import React, { forwardRef } from 'react'
import config from '../config.js'
import { params } from '../RequestBuilder'
import { AddRecordDialog } from './AddRecordDialog'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}
export default class RecordView extends React.Component {
    constructor(props) {
        super();
        this.state = {
            records: [],
            wallets: [],
            addModal: false
        }
    }
    updateRecord = (newData) => {
        return new Promise((resolve, reject) => {
            const reqParams = params(this.props.token, 'PUT', { id: newData.id, description: newData.description, value: newData.value, timestamp: newData.timestamp, walletName: newData.wallet, })
            fetch(config.api + '/records', reqParams).then(res => res.json()).then((updatedRecord) => {
                this.props.functionSet.openAlert(<Alert severity="success">edited Record</Alert>)
                resolve(updatedRecord);
                this.fetchItems();
            }).catch(err => reject(err))
        })
    }
    fetchItems = async () => {
        this.props.functionSet.toggleLoading(true);
        const reqParams = params(this.props.token, 'GET');
        try {
            const res = await fetch(config.api + '/records', reqParams)
            const records = await res.json();
            if (records.success) {
                this.setState({ records: records.message })
            } else {
                this.props.functionSet.openAlert(<Alert severity='error'>{records.message}</Alert>)
            }
            this.props.functionSet.toggleLoading(false);
        } catch (err) {
            console.log(err);
            this.props.functionSet.openAlert(<Alert severity='error'>oops, something went wrong retrieveing your records</Alert>)
            this.props.functionSet.toggleLoading(false);
        }
    }
    fetchWallets = async () => {
        this.props.functionSet.toggleLoading(true);
        const reqParams = params(this.props.token, 'GET')
        try {
            const res = await fetch(config.api + '/wallets', reqParams)
            const wallets = await res.json();
            if (wallets.success) {
                this.setState({ wallets: wallets.message })
            } else {
                this.props.functionSet.openAlert(<Alert severity='error'>{wallets.message}</Alert>)
            }
            this.props.functionSet.toggleLoading(false);
        } catch (err) {
            this.props.functionSet.openAlert(<Alert severity='error'>oops, something went wrong retrieveing your wallets</Alert>)
            this.props.functionSet.toggleLoading(false);
        }
    }


    closeDialog = () => {
        this.setState({ addModal: false })
    }
    deleteRecords = (event, rows) => {
        const deleteParam = { method: 'DELETE', headers: { "Authorization": this.props.token, "Content-Type": 'application/json' } }
        rows.forEach(async row => {
            const res = await fetch(config.api + '/records/' + row.id, deleteParam)
            const result = await res.json();
            if (!result.success) {

            } else {
                const newRecords = this.state.records.filter(rec => !(rec.id === row.id))
                this.setState({ records: newRecords })
            }
        })
        this.props.functionSet.openAlert(<Alert severity="success">deleted records</Alert>)
    }
    componentDidMount() {
        this.props.functionSet.changeHeader('Records');
        this.props.functionSet.toggleLoading();
        this.fetchWallets();
        this.fetchItems();
    }

    render() {
        let records = this.state.records.map(record => {
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
            item.month = `${month}-${year}`
            return item;
        })
        const walletLookup = Object.assign({}, ...this.state.wallets.map(wallet => ({ [wallet.name]: wallet.name })));
        return (
            <Container>
                <AddRecordDialog wallets={this.state.wallets} refreshRecords={this.fetchItems} token={this.props.token} open={this.state.addModal} functionSet={this.props.functionSet} closeDialog={this.closeDialog} />
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: "Description", field: "description" },
                        { title: "Value", field: "value", type: 'numeric' },
                        { title: "Timestamp", field: "timestamp", type: "datetime", },
                        { title: "Wallet", field: "wallet", lookup: walletLookup },
                        { title: "month", field: "month", defaultGroupOrder: 0, defaultGroupSort: "desc", },

                    ]}
                    data={records}
                    editable={{
                        isEditable: rowData => true,
                        onRowUpdate: this.updateRecord,
                    }}
                    options={{
                        sorting: true,
                        showTitle: false,
                        selection: true,

                    }}
                    actions={[
                        {
                            icon: () => <Delete />,
                            position: 'toolbarOnSelect',
                            onClick: this.deleteRecords
                        },
                    ]}

                >

                </MaterialTable>
                <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                    <Fab onClick={() => this.setState({ addModal: true })} style={{ position: 'fixed', right: '5%', bottom: '5%' }} color="primary" aria-label="add">
                        <NoteAdd />
                    </Fab>
                </Grid>
            </Container >
        )
    }
}