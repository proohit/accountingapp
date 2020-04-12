import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons'
import MaterialTable, { Icons } from 'material-table'
import React, { forwardRef } from 'react'
import { Severity } from '../../shared/alert/AlertModel'
import { DataComponentProps } from '../../shared/BaseProps'
import AddButton from '../../shared/buttons/AddButton'
import AuthenticationContext, { AuthenticationContextValue } from '../../shared/context/AuthenticationContext'
import Record from '../models/Record'
import { getAllRecordsByUser, postRecord } from '../service/RecordService'
import AddRecordDialog from './AddRecordDialog'

const tableIcons: Icons = {
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
};

interface IRecordViewState {
    addDialog: boolean;
    records: Record[];
}

export default class RecordView extends React.Component<DataComponentProps, IRecordViewState> {
    // only with public class syntax
    // static contextType = AuthenticationContext
    context: AuthenticationContextValue = this.context;

    state: IRecordViewState = {
        addDialog: false,
        records: []
    }
    componentDidMount() {
        this.fetchRecords();
    }
    toggleAddDialog = () => {
        this.setState({ addDialog: !this.state.addDialog })
    }
    fetchRecords = async () => {
        try {
            const records = await getAllRecordsByUser(this.context.token)
            this.setState({ records: records })
        } catch (e) {
            this.props.functionSet.openAlert({ message: e.message, severity: Severity.error })
        }
    }
    postRecord = async (item: Record) => {
        try {
            await postRecord(this.context.token, item);
            this.toggleAddDialog()
            this.fetchRecords()
            this.props.functionSet.openAlert({ message: "Record created!", severity: Severity.success })
        } catch (e) {
            console.log('RecordView catched error: ' + e.message);
        }
    }

    render() {
        return (
            <div>
                <AddRecordDialog confirmClickhandler={this.postRecord} open={this.state.addDialog} onCancel={this.toggleAddDialog} />
                <MaterialTable
                    icons={tableIcons}
                    options={{ showTitle: false }}
                    columns={[
                        { title: "Description", field: "description" },
                        { title: "Value", field: "value", type: 'numeric' },
                        { title: "Timestamp", field: "timestamp", type: "datetime", defaultSort: 'desc' },
                        { title: "Wallet", field: "wallet", },
                    ]}
                    data={this.state.records}
                ></MaterialTable>
                <AddButton onClick={this.toggleAddDialog} horizontalAlignment="flex-end" verticalAlignment="flex-end" type="add" style={{ position: 'fixed', right: '5%', bottom: '5%' }} />

            </div>
        )
    }
}

RecordView.contextType = AuthenticationContext