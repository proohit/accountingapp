import React, { useEffect, Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useRecords } from '../../src/records/hooks/useRecords';

interface RecordPageProps {}

const RecordPage: React.FunctionComponent<RecordPageProps> = (props) => {
  const { records, refreshRecords } = useRecords();

  return records ? (
    <Grid>
      {records.map((record) => (
        <Typography>{record.description}</Typography>
      ))}
    </Grid>
  ) : (
    <Fragment />
  );
};

export default RecordPage;
