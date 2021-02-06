import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { AccountBalance, AddBox, Payment } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../src/authentication/hooks/useAuthentication';
import { WalletCard } from '../../src/wallets/components/WalletCard';
import { WalletDialogContainer } from '../../src/wallets/components/WalletDialogContainer';
import {
  addWalletDialogState,
  editWalletDialogState,
} from '../../src/wallets/hooks/walletDialogsState';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';
import { Wallet } from '../../src/wallets/models/Wallet';

const walletPageStyles = makeStyles((theme) => ({
  walletContainer: {
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const WalletPage: React.FunctionComponent = (props) => {
  const { token } = useAuthentication();
  const { data: wallets } = useWalletsQuery(token);
  const classes = walletPageStyles();
  const [, setAddWalletDialog] = useRecoilState(addWalletDialogState);
  const [, setEditWalletDialog] = useRecoilState(editWalletDialogState);

  const openEditDialog = (wallet: Wallet) => {
    setEditWalletDialog({ open: true, walletToEdit: wallet });
  };

  const openAddDialog = () => {
    setAddWalletDialog({ open: true });
  };

  return wallets ? (
    <Grid container className={classes.walletContainer}>
      <Grid item container>
        <WalletDialogContainer />
        <AccountBalance fontSize="large" color="primary" />
        <Typography variant="h3" color="primary">
          Wallets
        </Typography>
        <IconButton color="primary" onClick={openAddDialog}>
          <AddBox />
        </IconButton>
      </Grid>
      {wallets.map((wallet) => (
        <Grid key={wallet.id}>
          <WalletCard wallet={wallet} onWalletClicked={openEditDialog} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Fragment />
  );
};
export default WalletPage;
