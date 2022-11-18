import { CategoryDto, RecordDto, WalletDto } from '@accountingapp/shared';
import { TableBody, TableCell, TableRow, Theme } from '@mui/material';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Format } from '../models/Format';
import { getCategoryById } from '../utils/categoryUtils';

type RecordTableBodyProps = {
  records: RecordDto[];
  onRecordClicked: (record: RecordDto) => void;
  categories: CategoryDto[];
  wallets: WalletDto[];
  noRecords?: boolean;
  noRecordsText?: string;
  format: Format;
  net: number;
};
export const RecordTableBody: FunctionComponent<RecordTableBodyProps> = (
  props
) => {
  const {
    categories,
    onRecordClicked,
    records,
    wallets,
    noRecords,
    noRecordsText,
    format,
    net,
  } = props;

  const accentBorder = (theme: Theme) =>
    `1px solid ${theme.palette.secondary.dark} !important`;

  const totalRowStyles = (theme: Theme) => ({
    fontWeight: 'bold',
    borderBottom: accentBorder(theme),
  });

  const rowStyles = (lastIndex?: boolean) => (theme: Theme) => ({
    borderBottom: lastIndex ? accentBorder(theme) : undefined,
  });

  const lastIndex = (index: number) => index === records.length - 1;

  return (
    <TableBody>
      {noRecords ? (
        <TableRow>
          <TableCell colSpan={5}>
            {noRecordsText ||
              'No records yet. Start tracking by creating a record'}
          </TableCell>
        </TableRow>
      ) : (
        records.map((record, idx) => (
          <TableRow
            hover
            key={record.id}
            onClick={() => onRecordClicked(record)}
          >
            <TableCell sx={rowStyles(lastIndex(idx))}>
              {record.description}
            </TableCell>
            <TableCell sx={rowStyles(lastIndex(idx))}>
              {getCategoryById(categories, record.categoryId)?.name}
            </TableCell>
            <TableCell sx={rowStyles(lastIndex(idx))}>
              {WalletUtils.getWalletById(wallets, record.walletId)?.name}
            </TableCell>
            <TableCell sx={rowStyles(lastIndex(idx))}>
              {dayjs(record.timestamp).format(format.dateTimeFormat)}
            </TableCell>
            <TableCell sx={rowStyles(lastIndex(idx))}>{record.value}</TableCell>
          </TableRow>
        ))
      )}
      <TableRow>
        <TableCell colSpan={4} align="right" sx={totalRowStyles}>
          Net
        </TableCell>
        <TableCell sx={totalRowStyles}>{net}</TableCell>
      </TableRow>
    </TableBody>
  );
};
