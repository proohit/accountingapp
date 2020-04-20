import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';
import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useEffect,
} from 'react';
import { Severity } from '../../shared/alert/AlertModel';
import { DataComponentProps } from '../../shared/BaseProps';
import AddButton from '../../shared/buttons/AddButton';
import AuthenticationContext from '../../shared/context/AuthenticationContext';
import Record from '../models/Record';
import {
  getAllRecordsByUser,
  postRecord as postRecordService,
} from '../service/RecordService';
import AddRecordDialog from './AddRecordDialog';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const RecordView: FunctionComponent<DataComponentProps> = (props) => {
  const context = React.useContext(AuthenticationContext);
  const [records, setRecords] = React.useState<Array<Record>>([]);
  const [addDialog, setAddDialog] = React.useState<boolean>(false);

  const toggleAddDialog = () => {
    setAddDialog(!addDialog);
  };
  const fetchRecords = useCallback(async () => {
    try {
      const records = await getAllRecordsByUser(context!.token);
      setRecords(records);
      return records;
    } catch (e) {
      props.functionSet.openAlert({
        message: e.message,
        severity: Severity.error,
      });
    }
  }, [context, props.functionSet]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const postRecord = async (item: Record) => {
    try {
      await postRecordService(context!.token, item);
      toggleAddDialog();
      fetchRecords();
      props.functionSet.openAlert({
        message: 'Record created!',
        severity: Severity.success,
      });
    } catch (e) {
      console.log('RecordView catched error: ' + e.message);
    }
  };
  return (
    <div>
      <AddRecordDialog
        confirmClickhandler={postRecord}
        open={addDialog}
        onCancel={toggleAddDialog}
      />
      {}
      <MaterialTable
        icons={tableIcons}
        options={{ showTitle: false }}
        columns={[
          { title: 'Description', field: 'description' },
          { title: 'Value', field: 'value', type: 'numeric' },
          {
            title: 'Timestamp',
            field: 'timestamp',
            type: 'datetime',
            defaultSort: 'desc',
          },
          { title: 'Wallet', field: 'walletName' },
        ]}
        data={records}
      ></MaterialTable>
      <AddButton
        onClick={toggleAddDialog}
        horizontalAlignment='flex-end'
        verticalAlignment='flex-end'
        type='add'
        style={{ position: 'fixed', right: '5%', bottom: '5%' }}
      />
    </div>
  );
};

export default RecordView;
