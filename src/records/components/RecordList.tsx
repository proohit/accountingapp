import React, { Fragment, FunctionComponent } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useRecords } from '../hooks/useRecords';
import { RecordCard } from './RecordCArd';

const RecordList: FunctionComponent = () => {
  const { records } = useRecords();

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
