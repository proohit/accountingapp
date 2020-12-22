import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React from 'react';
import { Order } from '../../shared/models/SortOrder';
import { Record } from '../models/Record';
import { HeadCell } from '../../shared/models/HeadCell';

interface RecordTableHeaderProps {
  headers: HeadCell<Record>[];
  direction: Order;
  sortBy: keyof Record;
  sortClicked(newOrderKey: keyof Record): void;
}
export const RecordTableHeader = (props: RecordTableHeaderProps) => {
  const { headers, sortBy, direction, sortClicked } = props;
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header.key}>
            <TableSortLabel
              active={header.key === sortBy}
              direction={direction}
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
