import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletForm } from './WalletForm';

interface WalletEditDialogProps {
  onDialogClose(): void;
  onEditWallet(editedWallet: Wallet): void;
  onDeleteWallet(walletToDelete: Wallet): void;
  owner: string;
  wallet: Wallet;
}

export const WalletEditDialog = (props: WalletEditDialogProps) => {
  const {
    onDialogClose,
    onEditWallet: onEditRecord,
    onDeleteWallet: onDeleteRecord,
    owner,
    wallet,
  } = props;

  const [editedWallet, setEditedWallet] = useState<Wallet>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            Edit Wallet
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={() => onDeleteRecord(wallet)}>
              <Delete />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={onDialogClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <WalletForm
          owner={owner}
          wallet={wallet}
          onFormValidChanged={setIsFormValid}
          onWalletChange={setEditedWallet}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDialogClose} variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => onEditRecord(editedWallet)}
          variant="contained"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
