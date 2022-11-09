import { Grid, TextField } from '@mui/material';
import { useWalletForm } from '../hooks/useWalletForm';

interface WalletFormProps {
  walletForm: ReturnType<typeof useWalletForm>;
}

export const WalletForm = (props: WalletFormProps) => {
  const { walletForm } = props;

  return (
    <form onSubmit={walletForm.handleSubmit} id="walletForm">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            margin="dense"
            error={!!walletForm.errors.name}
            helperText={walletForm.errors.name}
            color="secondary"
            label="Name"
            name="name"
            value={walletForm.values.name}
            onChange={walletForm.handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            error={!!walletForm.errors.balance}
            helperText={walletForm.errors.balance}
            color="secondary"
            label="Balance"
            name="balance"
            value={walletForm.values.balance}
            onChange={walletForm.handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};
