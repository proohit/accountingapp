import { TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import { Record } from '../models/Record';
import { Category } from '../models/Category';
import { Wallet } from '../../wallets/models/Wallet';

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
            {
              categories.find((category) => category.id === record.categoryId)
                ?.name
            }
          </TableCell>
          <TableCell>
            {wallets.find((wallet) => wallet.id === record.walletId)?.name}
          </TableCell>
          <TableCell>{record.timestamp}</TableCell>
          <TableCell>{record.value}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
