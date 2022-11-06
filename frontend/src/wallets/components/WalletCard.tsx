import { WalletDto as Wallet } from '@accountingapp/shared';
import { Payment } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { FunctionComponent } from 'react';
import { makeStyles } from 'tss-react/mui';

const walletCardStyles = makeStyles()((theme) => ({
  cardTitle: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 250,
  },
}));

type WalletCardProps = {
  wallet: Wallet;
  onWalletClicked: (wallet: Wallet) => void;
};

export const WalletCard: FunctionComponent<WalletCardProps> = (props) => {
  const { wallet, onWalletClicked } = props;
  const { classes } = walletCardStyles();
  return (
    <Card key={wallet.id} elevation={4}>
      <CardActionArea onClick={() => onWalletClicked(wallet)}>
        <CardHeader
          avatar={<Payment color="primary" fontSize="large" />}
          title={wallet.name}
          titleTypographyProps={{
            variant: 'h5',
            color: 'primary',
            className: classes.cardTitle,
          }}
        />
        <CardContent>
          <Typography color="textSecondary" variant="body1">
            initial balance: {wallet.balance}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            current balance: {wallet.currentBalance}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
