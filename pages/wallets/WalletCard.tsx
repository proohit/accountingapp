import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Wallet } from '../../src/wallets/models/Wallet';

type WalletCardProps = {
  wallet: Wallet;
  onWalletClicked: (wallet: Wallet) => void;
};
export const WalletCard: FunctionComponent<WalletCardProps> = (props) => {
  const { wallet, onWalletClicked } = props;
  return (
    <Card key={wallet.id}>
      <CardActionArea onClick={() => onWalletClicked(wallet)}>
        <CardContent>
          <Typography variant="h5">{wallet.name}</Typography>
          <Typography variant="h6">
            initial balance: {wallet.balance}
          </Typography>
          <Typography variant="h6">current balance: 0</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
