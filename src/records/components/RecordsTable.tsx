import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import dayjs from 'dayjs';
import React, { MouseEvent } from 'react';
import { HeadCell } from '../../shared/models/HeadCell';
import { SortOrder } from '../../shared/models/SortOrder';
import { Wallet } from '../../wallets/models/Wallet';
import { getWalletById } from '../../wallets/utils/walletUtils';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { getCategoryById } from '../utils/categoryUtils';

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
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.key}>
                  <TableSortLabel
                    active={header.key === sortOrder.orderBy}
                    direction={sortOrder.order}
                    onClick={() => sortClicked(header.key)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow
                hover
                key={record.id}
                onClick={() => onRecordClicked(record)}
              >
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {getCategoryById(categories, record.categoryId)?.name}
                </TableCell>
                <TableCell>
                  {getWalletById(wallets, record.walletId)?.name}
                </TableCell>
                <TableCell>
                  {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell>{record.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
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
