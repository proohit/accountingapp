import { Grid, IconButton, Typography } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useAuthentication } from '../../src/authentication/hooks/useAuthentication';
import { useDialogs } from '../../src/shared/hooks/useDialogs';
import { WalletDialogContainer } from '../../src/wallets/components/WalletDialogContainer';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';
import { Wallet } from '../../src/wallets/models/Wallet';
import { WalletCard } from './WalletCard';
export type WalletDialogs = {
  editWallet: {
    open: boolean;
    walletToEdit: Wallet;
  };
  addWallet: {
    open: boolean;
  };
};
const WalletPage: React.FunctionComponent = (props) => {
  const { token } = useAuthentication();
  const { data: wallets } = useWalletsQuery(token);

  const dialogsState = useDialogs<WalletDialogs>({
    editWallet: {
      open: false,
      walletToEdit: null,
    },
    addWallet: {
      open: false,
    },
  });

  const openEditDialog = (wallet: Wallet) => {
    dialogsState.setSingleDialog('editWallet', {
      open: true,
      walletToEdit: wallet,
    });
  };

  const openAddDialog = () => {
    dialogsState.setSingleDialog('addWallet', {
      open: true,
    });
  };

  return wallets ? (
    <>
      <Grid container item xs={4} direction="column" style={{ gap: 8 }}>
        <WalletDialogContainer dialogsState={dialogsState} />
        <Grid container item>
          <Typography variant="h3">Wallets</Typography>
          <IconButton color="primary" onClick={openAddDialog}>
            <AddBox />
          </IconButton>
        </Grid>
        {wallets.map((wallet) => (
          <WalletCard wallet={wallet} onWalletClicked={openEditDialog} />
        ))}
      </Grid>
    </>
  ) : (
    <Fragment />
  );
};

export default WalletPage;
