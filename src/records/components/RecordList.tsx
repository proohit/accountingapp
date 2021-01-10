import React, { Fragment, FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { useSort } from '../../shared/hooks/useSort';
import { Order } from '../../shared/models/SortOrder';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { RecordDialogContainer } from './RecordDialogContainer';
import { RecordDialogs } from '../models/RecordDialogs';
import { RecordsTable } from './RecordsTable';

const RecordList: FunctionComponent = () => {
  const { token } = useAuthentication();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [{ order, orderBy }, handleSortClicked] = useSort<Record>({
    order: Order.desc,
    orderBy: 'timestamp',
  });
  const dialogsState = useDialogs<RecordDialogs>({
    ADD_RECORD: { open: false },
    EDIT_RECORD: { open: false, recordToEdit: null },
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
    <>
      <RecordDialogContainer dialogsState={dialogsState} />
      <RecordsTable
        addClicked={() =>
          dialogsState.setSingleDialog('ADD_RECORD', { open: true })
        }
        sortClicked={handleSortClicked}
        records={paginatedResult.data}
        categories={categories}
        wallets={wallets}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onRecordClicked={(record) =>
          dialogsState.setSingleDialog('EDIT_RECORD', {
            open: true,
            recordToEdit: record,
          })
        }
        onChangePage={(newPage) => setPage(newPage + 1)}
        onChangeRowsPerPage={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
        rowCount={paginatedResult.totalCount || 0}
        sortOrder={{ order, orderBy }}
      />
    </>
  ) : (
    <Fragment />
  );
};

export default RecordList;
