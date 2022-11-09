import { WalletDto } from '@accountingapp/shared';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import { useWalletForm } from '../hooks/useWalletForm';
import { WalletForm } from './WalletForm';

interface WalletAddDialogProps {
  onDialogClose(): void;
  onAddWallet(walletToAdd: WalletDto): void;
  owner: string;
  isLoading?: boolean;
}

export const WalletAddDialog = (props: WalletAddDialogProps) => {
  const { onDialogClose, onAddWallet, owner, isLoading } = props;

  const walletForm = useWalletForm({
    onSubmit: (values) => {
      onAddWallet({
        id: undefined,
        currentBalance: undefined,
        name: values.name,
        balance: Number(values.balance),
        ownerUsername: owner,
      });
    },
    validateOnChange: false,
  });

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Add Wallet</DialogTitle>
      <DialogContent>
        <WalletForm walletForm={walletForm} />
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
          onClick={() => walletForm.submitForm()}
          variant="contained"
          type="submit"
          form="wallet-form"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
