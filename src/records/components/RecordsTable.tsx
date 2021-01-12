import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { FunctionComponent, MouseEvent } from 'react';

interface RecordsTableProps {
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowCount: number;
  addClicked(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void;
}
export const RecordsTable: FunctionComponent<RecordsTableProps> = (props) => {
  const {
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowCount,
    addClicked,
    children,
  } = props;

  return (
    <Paper>
      <Toolbar>
        <Grid container justify="flex-end">
          <Tooltip title="Add">
            <IconButton onClick={addClicked} color="primary" aria-label="add">
              <AddBox />
            </IconButton>
          </Tooltip>
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
