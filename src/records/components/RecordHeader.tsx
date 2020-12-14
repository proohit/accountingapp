import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
}));

export const RecordHeader = () => {
  const classes = styles();
  return (
    <Typography variant="h3" className={classes.header}>
      Records
    </Typography>
  );
};
