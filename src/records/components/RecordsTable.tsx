import {
  Grid,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Toolbar,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';

interface RecordsTableProps {
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowCount: number;
  toolbar: JSX.Element;
}
export const RecordsTable: FunctionComponent<RecordsTableProps> = (props) => {
  const {
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowCount,
    toolbar,
    children,
  } = props;

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
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        onChangePage={(_event, newPage) => {
          onChangePage(newPage);
        }}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Paper>
  );
};
