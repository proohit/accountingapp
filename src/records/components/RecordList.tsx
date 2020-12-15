import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useRecords } from '../hooks/useRecords';
import { RecordsTable } from './RecordsTable';

const RecordList: FunctionComponent = () => {
  const { records, refreshRecords } = useRecords();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    refreshRecords();
  }, []);

  const getRecordsByPage = () => {
    return records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return records && records.length ? (
    <RecordsTable
      records={getRecordsByPage()}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={(newPage) => setPage(newPage)}
      onChangeRowsPerPage={(event) =>
        setRowsPerPage(parseInt(event.target.value, 10))
      }
      rowCount={records.length}
    />
  ) : (
    <Fragment />
  );
};

export default RecordList;
