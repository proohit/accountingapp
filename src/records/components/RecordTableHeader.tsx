import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { HeadCell } from '../../shared/models/HeadCell';
import { SortOrder } from '../../shared/models/SortOrder';
import { Record } from '../models/Record';

type RecordTableHeaderProps = {
  sortOrder: SortOrder<Record>;
  sortClicked: (newOrderKey: keyof Record) => void;
};
export const RecordTableHeader: FunctionComponent<RecordTableHeaderProps> = (
  props
) => {
  const { sortClicked, sortOrder } = props;

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
  );
};
