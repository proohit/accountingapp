import { ListItem, ListItemText, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Record } from '../models/Record';
import { getCategoryById } from '../utils/categoryUtils';

type MobileRecordItemProps = {
  record: Record;
  onRecordClick: (record: Record) => void;
  categories: any[];
  wallets: import('/home/direnc/workspace/AccountingAppWeb/src/wallets/models/Wallet').Wallet[];
};

export const MobileRecordItem: FunctionComponent<MobileRecordItemProps> = (
  props
) => {
  const { categories, onRecordClick, record, wallets } = props;
  return (
    <ListItem
      key={record.id}
      button
      divider
      onClick={() => {
        onRecordClick(record);
      }}
    >
      <ListItemText
        primary={record.description}
        secondary={
          <>
            <Typography color={record.value < 0 ? 'error' : 'primary'}>
              Value: {record.value}
            </Typography>
            <Typography>
              Category: {getCategoryById(categories, record.categoryId)?.name}
              {', '}
              Wallet:{' '}
              {WalletUtils.getWalletById(wallets, record.walletId)?.name}
            </Typography>
            <Typography>
              Timestamp: {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};
