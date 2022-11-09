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
import { useWalletForm } from '../hooks/useWalletForm';
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

  const walletForm = useWalletForm(
    {
      onSubmit: (values) => {
        onEditRecord({
          ...wallet,
          name: values.name,
          balance: Number(values.balance),
          ownerUsername: owner,
        });
      },
      validateOnChange: false,
    },
    { balance: wallet.balance.toString(), name: wallet.name }
  );

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
        <WalletForm walletForm={walletForm} />
        {isLoading && <LinearProgress />}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDialogClose} variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          form="walletForm"
          onClick={() => walletForm.submitForm()}
          disabled={isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
