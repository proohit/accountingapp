import { ListItem, ListItemText, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Record } from '../models/Record';
import { getCategoryById } from '../utils/categoryUtils';

type MobileRecordItemProps = {
  record: Record;
  onRecordClick: (record: Record) => void;
  categories: any[];
  wallets: Wallet[];
};

export const MobileRecordItem: FunctionComponent<MobileRecordItemProps> = (
  props
) => {
  const { categories, onRecordClick, record, wallets } = props;
  return (
    <ListItem
      button
      divider
      onClick={() => {
        onRecordClick(record);
      }}
    >
      <ListItemText>
        <Typography>{record.description}</Typography>
        <Typography
          variant="body2"
          color={record.value < 0 ? 'error' : 'primary'}
        >
          Value: {record.value}
        </Typography>
        <Typography variant="body2">
          Category: {getCategoryById(categories, record.categoryId)?.name}
          {', '}
          Wallet: {WalletUtils.getWalletById(wallets, record.walletId)?.name}
        </Typography>
        <Typography variant="body2">
          Timestamp: {dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};
