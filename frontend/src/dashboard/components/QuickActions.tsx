import { AddBox, Upload } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import {
  addRecordDialogState,
  importRecordDialogState,
} from '../../records/hooks/recordsDialogsState';
import { addWalletDialogState } from '../../wallets/hooks/walletDialogsState';

export const QuickActions = () => {
  const setAddRecordsDialog = useSetRecoilState(addRecordDialogState);
  const setImportRecordDialog = useSetRecoilState(importRecordDialogState);
  const setAddWalletDialog = useSetRecoilState(addWalletDialogState);
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
        startIcon={<Upload />}
        onClick={() => setImportRecordDialog({ open: true })}
      >
        Import Records
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
