import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { AccountBalance, AddBox } from '@material-ui/icons';
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
    padding: theme.spacing(2),
  },
}));

const WalletPage: React.FunctionComponent = (props) => {
  const { data: wallets } = useWalletsQuery();
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
      <WalletDialogContainer />
      <Grid item container alignItems="center" spacing={2}>
        <Grid item>
          <AccountBalance fontSize="large" color="primary" />
        </Grid>
        <Grid item>
          <Typography variant="h3" color="primary">
            Wallets
          </Typography>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={openAddDialog}>
            <AddBox />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {wallets.map((wallet) => (
          <Grid item key={wallet.id}>
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onWalletClicked={openEditDialog}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  ) : (
    <Fragment />
  );
};
export default WalletPage;
