import React, { Fragment, FunctionComponent, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useRecords } from '../hooks/useRecords';
import { RecordCard } from './RecordCard';

const RecordList: FunctionComponent = () => {
  const { records, refreshRecords } = useRecords();

  useEffect(() => {
    refreshRecords();
  }, []);

  return records && records.length ? (
    <Grid>
      {records.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </Grid>
  ) : (
    <Fragment />
  );
};

export default RecordList;
