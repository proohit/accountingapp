import { Button, Grid } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { addRecordDialogState } from '../../records/hooks/recordsDialogsState';
import { addWalletDialogState } from '../../wallets/hooks/walletDialogsState';

export const QuickActions = () => {
  const [, setAddRecordsDialog] = useRecoilState(addRecordDialogState);
  const [, setAddWalletDialog] = useRecoilState(addWalletDialogState);
  return (
    <Grid container direction="row">
      <Button
        color="primary"
        startIcon={<AddBox />}
        onClick={() => setAddRecordsDialog({ open: true })}
      >
        Add Record
      </Button>
      <Button
        color="primary"
        startIcon={<AddBox />}
        onClick={() => setAddWalletDialog({ open: true })}
      >
        Add Wallet
      </Button>
    </Grid>
  );
};
