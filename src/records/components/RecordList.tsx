import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { useSort } from '../../shared/hooks/useSort';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { Order } from '../../shared/models/SortOrder';
import { useRecords } from '../hooks/useRecords';
import { Record } from '../models/Record';
import { RecordDialogContainer } from './RecordDialogContainer';
import { RecordsTable } from './RecordsTable';

const RecordList: FunctionComponent = () => {
  const { records, getRecords, totalRecords } = useRecords();
  const { openDialog } = useDialogs();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
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

  return records && records.length ? (
    <>
      <RecordDialogContainer />
      <RecordsTable
        addClicked={() => openDialog(Dialogs.addRecord)}
        sortClicked={handleSortClicked}
        records={records}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={(newPage) => setPage(newPage + 1)}
        onChangeRowsPerPage={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
        rowCount={totalRecords || 0}
        sortOrder={{ order, orderBy }}
      />
    </>
  ) : (
    <Fragment />
  );
};

export default RecordList;
