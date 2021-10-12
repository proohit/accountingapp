import { Button, Grid, Toolbar } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import * as React from 'react';

export const QuickActions = () => {
  return (
    <Grid container direction="row">
      <Button color="primary" startIcon={<AddBox />}>
        Add Record
      </Button>
      <Button color="primary" startIcon={<AddBox />}>
        Add Wallet
      </Button>
    </Grid>
  );
};
