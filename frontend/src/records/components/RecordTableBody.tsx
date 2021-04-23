import { TableBody, TableCell, TableRow } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { getCategoryById } from '../utils/categoryUtils';

type RecordTableBodyProps = {
  records: Record[];
  onRecordClicked: (record: Record) => void;
  categories: Category[];
  wallets: Wallet[];
  noRecords?: boolean;
  noRecordsText?: string;
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
  } = props;
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
        records.map((record) => (
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
              {WalletUtils.getWalletById(wallets, record.walletId)?.name}
            </TableCell>
            <TableCell>
              {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}
            </TableCell>
            <TableCell>{record.value}</TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};
