import { RecordDto } from '@accountingapp/shared';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FunctionComponent, PropsWithChildren } from 'react';
import { HeadCell } from '../../shared/models/HeadCell';

type RecordTableHeaderProps = PropsWithChildren & {
  sortDirection?: 'asc' | 'desc';
  sortBy?: keyof RecordDto;
  sortClicked?: (newOrderKey: keyof RecordDto) => void;
};
export const RecordTableHeader: FunctionComponent<RecordTableHeaderProps> = (
  props
) => {
  const { sortClicked, sortBy, sortDirection, children } = props;

  const headers: HeadCell<RecordDto>[] = [
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
        {children}
      </TableRow>
    </TableHead>
  );
};
