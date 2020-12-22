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
import React, { MouseEvent } from 'react';
import { SortOrder } from '../../shared/models/SortOrder';
import { Record } from '../models/Record';
import { HeadCell } from '../../shared/models/HeadCell';
import { RecordTableHeader } from './RecordTableHeader';
import { RecordTableBody } from './RecordTableBody';
import { Add, AddBox } from '@material-ui/icons';

interface RecordsTableProps {
  records: Record[];
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowCount: number;
  sortOrder: SortOrder<Record>;
  sortClicked(newOrderKey: keyof Record): void;
  addClicked(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void;
}
export const RecordsTable = (props: RecordsTableProps) => {
  const {
    records,
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowCount,
    sortOrder,
    sortClicked,
    addClicked,
  } = props;

  const headers: HeadCell<Record>[] = [
    { key: 'description', label: 'description' },
    { key: 'category', label: 'category' },
    { key: 'walletName', label: 'wallet' },
    { key: 'timestamp', label: 'timestamp' },
    { key: 'value', label: 'value' },
  ];
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
        <Table>
          <RecordTableHeader
            headers={headers}
            sortBy={sortOrder.orderBy}
            direction={sortOrder.order}
            sortClicked={sortClicked}
          />
          <RecordTableBody records={records} />
        </Table>
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
