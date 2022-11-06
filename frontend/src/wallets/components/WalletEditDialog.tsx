import { WalletDto } from '@accountingapp/shared';
import { Close, Delete } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { useState } from 'react';
import { WalletForm } from './WalletForm';

interface WalletEditDialogProps {
  onDialogClose(): void;
  onEditWallet(editedWallet: WalletDto): void;
  onDeleteWallet(walletToDelete: WalletDto): void;
  owner: string;
  wallet: WalletDto;
  isLoading?: boolean;
}

export const WalletEditDialog = (props: WalletEditDialogProps) => {
  const {
    onDialogClose,
    onEditWallet: onEditRecord,
    onDeleteWallet: onDeleteRecord,
    owner,
    wallet,
    isLoading,
  } = props;

  const [editedWallet, setEditedWallet] = useState<WalletDto>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            Edit Wallet
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              onClick={() => onDeleteRecord(wallet)}
              size="large"
            >
              <Delete />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={onDialogClose} size="large">
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
        {isLoading && <LinearProgress />}
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
