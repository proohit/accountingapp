import { Grid, Paper, Table, TableContainer, Toolbar } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

interface RecordsTableProps {
  toolbar: JSX.Element;
  controls: JSX.Element;
}
export const RecordsTable: FunctionComponent<RecordsTableProps> = (props) => {
  const { toolbar, children, controls } = props;

  return (
    <Paper>
      <Toolbar>
        <Grid container item direction="row" alignContent="center">
          {toolbar}
        </Grid>
      </Toolbar>
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
      {controls}
    </Paper>
  );
};
