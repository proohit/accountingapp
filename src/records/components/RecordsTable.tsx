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
import { Wallet } from '../../wallets/models/Wallet';
import { Category } from '../models/Category';

interface RecordsTableProps {
  records: Record[];
  categories: Category[];
  wallets: Wallet[];
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
  onRecordClicked(record: Record): void;
}
export const RecordsTable = (props: RecordsTableProps) => {
  const {
    records,
    categories,
    wallets,
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowCount,
    sortOrder,
    sortClicked,
    addClicked,
    onRecordClicked,
  } = props;

  const headers: HeadCell<Record>[] = [
    { key: 'description', label: 'description' },
    { key: 'categoryId', label: 'category' },
    { key: 'walletId', label: 'wallet' },
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
          <RecordTableBody
            wallets={wallets}
            categories={categories}
            records={records}
            onRecordClicked={onRecordClicked}
          />
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
