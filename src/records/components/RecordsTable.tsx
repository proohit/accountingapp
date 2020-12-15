import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';
import { Record } from '../models/Record';

interface RecordsTableProps {
  records: Record[];
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  rowCount: number;
}
export const RecordsTable = (props: RecordsTableProps) => {
  const {
    records,
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowCount,
  } = props;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>description</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>wallet</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>category</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>timestamp</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel>value</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow hover key={record.id}>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.walletName}</TableCell>
                <TableCell>{record.category}</TableCell>
                <TableCell>{record.timestamp}</TableCell>
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
