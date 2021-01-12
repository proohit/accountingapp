import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletForm } from './WalletForm';

interface WalletAddDialogProps {
  onDialogClose(): void;
  onAddWallet(walletToAdd: Wallet): void;
  owner: string;
}

export const WalletAddDialog = (props: WalletAddDialogProps) => {
  const { onDialogClose, onAddWallet, owner } = props;
  const [walletToAdd, setWalletToAdd] = useState<Wallet>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Add Wallet</DialogTitle>
      <DialogContent>
        <WalletForm
          onFormValidChanged={setIsFormValid}
          onWalletChange={setWalletToAdd}
          owner={owner}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => onDialogClose()}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          onClick={() => onAddWallet(walletToAdd)}
          variant="contained"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
