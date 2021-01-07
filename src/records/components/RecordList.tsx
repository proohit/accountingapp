import React, {
  createContext,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { useSort } from '../../shared/hooks/useSort';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { Order } from '../../shared/models/SortOrder';
import { useWallets } from '../../wallets/hooks/useWallets';
import { useCategories } from '../hooks/useCategories';
import { RecordsContext, useRecords } from '../hooks/useRecords';
import { Record } from '../models/Record';
import { RecordDialogContainer } from './RecordDialogContainer';
import { RecordsTable } from './RecordsTable';

interface RecordListContextModel {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof Record;
  selectedRecord: Record;
}

export const RecordListContext = createContext<RecordListContextModel>(
  {} as RecordListContextModel
);

const RecordList: FunctionComponent = () => {
  const { records, getRecords, totalRecords } = useRecords();
  const { categories, getCategories } = useCategories();
  const { wallets, getWallets } = useWallets();
  const { openDialog } = useDialogs();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<Record>(null);
  const [{ order, orderBy }, handleSortClicked] = useSort<Record>({
    order: Order.desc,
    orderBy: 'timestamp',
  });

  useEffect(() => {
    getRecords({
      page,
      itemsPerPage: rowsPerPage,
      sortBy: orderBy,
      sortDirection: orderBy && order,
    });
  }, [order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (!wallets) {
      getWallets();
    }
  }, [wallets]);

  return records?.length && wallets?.length && categories?.length ? (
    <RecordListContext.Provider
      value={{ rowsPerPage, page, order, orderBy, selectedRecord }}
    >
      <RecordDialogContainer />
      <RecordsTable
        addClicked={() => openDialog(Dialogs.addRecord)}
        sortClicked={handleSortClicked}
        records={records}
        categories={categories}
        wallets={wallets}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onRecordClicked={(record) => {
          setSelectedRecord(record);
          openDialog(Dialogs.editRecord);
        }}
        onChangePage={(newPage) => setPage(newPage + 1)}
        onChangeRowsPerPage={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
        rowCount={totalRecords || 0}
        sortOrder={{ order, orderBy }}
      />
    </RecordListContext.Provider>
  ) : (
    <Fragment />
  );
};

export default RecordList;
