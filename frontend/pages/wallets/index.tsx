import { Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AccountBalance, AddBox } from '@mui/icons-material';
import Head from 'next/head';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import PageHeader from '../../src/shared/components/PageHeader';
import { WalletCard } from '../../src/wallets/components/WalletCard';
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
  const { data: wallets, isFetching } = useWalletsQuery();
  const classes = walletPageStyles();
  const setAddWalletDialog = useSetRecoilState(addWalletDialogState);
  const setEditWalletDialog = useSetRecoilState(editWalletDialogState);

  const openEditDialog = (wallet: Wallet) => {
    setEditWalletDialog({ open: true, walletToEdit: wallet });
  };

  const openAddDialog = () => {
    setAddWalletDialog({ open: true });
  };

  return (
    <>
      <Head>
        <title>Wallets - AccountingApp</title>
        <meta
          property="og:title"
          content="Wallets - AccountingApp"
          key="title"
        />
        <meta
          property="og:description"
          content="Wallets overview in the AccountingApp"
          key="description"
        />
      </Head>
      <Grid container className={classes.walletContainer}>
        <PageHeader
          header={'Wallets'}
          icon={<AccountBalance fontSize="large" color="primary" />}
          actions={
            <IconButton color="primary" onClick={openAddDialog} size="large">
              <AddBox />
            </IconButton>
          }
        />
        <Grid container spacing={2}>
          {isFetching ? (
            <Grid item xs>
              <LinearProgress />
            </Grid>
          ) : wallets.length ? (
            wallets.map((wallet) => (
              <Grid item key={wallet.id}>
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  onWalletClicked={openEditDialog}
                />
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography color="primary">
                You have no Wallets. Create one!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default WalletPage;
