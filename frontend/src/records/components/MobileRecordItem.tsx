import { RecordDto, WalletDto } from '@accountingapp/shared';
import { ListItem, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { Format } from '../models/Format';
import { getCategoryById } from '../utils/categoryUtils';

type MobileRecordItemProps = {
  record: RecordDto;
  onRecordClick: (record: RecordDto) => void;
  categories: any[];
  wallets: WalletDto[];
  format: Format;
};

export const MobileRecordItem: FunctionComponent<MobileRecordItemProps> = (
  props
) => {
  const { categories, onRecordClick, record, wallets, format } = props;
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
          Timestamp: {dayjs(record.timestamp).format(format.dateTimeFormat)}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};
