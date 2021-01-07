import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { Record } from '../models/Record';
import { Category } from '../models/Category';
import { Wallet } from '../../wallets/models/Wallet';
import dayjs from 'dayjs';
import { getCategoryById } from '../utils/categoryUtils';
import { getWalletById } from '../../wallets/utils/walletUtils';

export interface RecordTableBody {
  records: Record[];
  categories: Category[];
  wallets: Wallet[];
  onRecordClicked(record: Record): void;
}

export const RecordTableBody = (props: RecordTableBody) => {
  const { records, wallets, categories, onRecordClicked } = props;
  return (
    <TableBody>
      {records.map((record) => (
        <TableRow hover key={record.id} onClick={() => onRecordClicked(record)}>
          <TableCell>{record.description}</TableCell>
          <TableCell>
            {getCategoryById(categories, record.categoryId)?.name}
          </TableCell>
          <TableCell>{getWalletById(wallets, record.walletId)?.name}</TableCell>
          <TableCell>
            {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          </TableCell>
          <TableCell>{record.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
