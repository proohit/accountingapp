import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { WalletForm } from './WalletForm';

interface WalletAddDialogProps {
  onDialogClose(): void;
  onAddWallet(walletToAdd: Wallet): void;
  owner: string;
  isLoading?: boolean;
}

export const WalletAddDialog = (props: WalletAddDialogProps) => {
  const { onDialogClose, onAddWallet, owner, isLoading } = props;
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
        {isLoading && <LinearProgress />}
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
