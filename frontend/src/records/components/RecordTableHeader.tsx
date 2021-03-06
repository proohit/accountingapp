import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { HeadCell } from '../../shared/models/HeadCell';
import { Record } from '../models/Record';

type RecordTableHeaderProps = {
  sortDirection: 'asc' | 'desc';
  sortBy: keyof Record;
  sortClicked: (newOrderKey: keyof Record) => void;
};
export const RecordTableHeader: FunctionComponent<RecordTableHeaderProps> = (
  props
) => {
  const { sortClicked, sortBy, sortDirection } = props;

  const headers: HeadCell<Record>[] = [
    { key: 'description', label: 'description' },
    { key: 'categoryId', label: 'category' },
    { key: 'walletId', label: 'wallet' },
    { key: 'timestamp', label: 'timestamp' },
    { key: 'value', label: 'value' },
  ];
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header.key}>
            <TableSortLabel
              active={header.key === sortBy}
              direction={sortDirection}
              onClick={() => sortClicked(header.key)}
            >
              {header.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
