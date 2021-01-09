import React, {
  createContext,
  Fragment,
  FunctionComponent,
  useState,
} from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { useSort } from '../../shared/hooks/useSort';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { Order } from '../../shared/models/SortOrder';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { Record } from '../models/Record';
import { RecordDialogContainer } from './RecordDialogContainer';
import { useRecordsQuery } from '../hooks/recordsQueries';
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
  const { token } = useAuthentication();
  const { openDialog } = useDialogs();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<Record>(null);
  const [{ order, orderBy }, handleSortClicked] = useSort<Record>({
    order: Order.desc,
    orderBy: 'timestamp',
  });

  const { data: paginatedResult } = useRecordsQuery(
    page,
    rowsPerPage,
    orderBy,
    order,
    token
  );

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  return paginatedResult?.data && wallets?.length && categories?.length ? (
    <RecordListContext.Provider
      value={{ rowsPerPage, page, order, orderBy, selectedRecord }}
    >
      <RecordDialogContainer />
      <RecordsTable
        addClicked={() => openDialog(Dialogs.addRecord)}
        sortClicked={handleSortClicked}
        records={paginatedResult.data}
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
        rowCount={paginatedResult.totalCount || 0}
        sortOrder={{ order, orderBy }}
      />
    </RecordListContext.Provider>
  ) : (
    <Fragment />
  );
};

export default RecordList;
