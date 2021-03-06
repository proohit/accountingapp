import { Grid, Paper, Table, TableContainer, Toolbar } from '@mui/material';
import React, { FunctionComponent } from 'react';

interface RecordsTableProps {
  toolbar?: JSX.Element;
  controls?: JSX.Element;
}
export const RecordsTable: FunctionComponent<RecordsTableProps> = (props) => {
  const { toolbar, children, controls } = props;

  return (
    <Paper>
      {toolbar && (
        <Toolbar>
          <Grid container item direction="row" alignContent="center">
            {toolbar}
          </Grid>
        </Toolbar>
      )}
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
      {controls}
    </Paper>
  );
};
