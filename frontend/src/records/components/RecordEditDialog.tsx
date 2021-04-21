import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { RecordForm } from './RecordForm';

interface RecordEditDialogProps {
  onDialogClose(): void;
  onEditRecord(editedRecord: Record): void;
  onDeleteRecord(recordToDelete: Record): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
  record: Record;
  isLoading?: boolean;
}

export const RecordEditDialog = (props: RecordEditDialogProps) => {
  const {
    onDialogClose,
    wallets,
    onEditRecord,
    onDeleteRecord,
    categories,
    owner,
    record,
    isLoading,
  } = props;
  const [editedRecord, setEditedRecord] = useState<Record>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            Edit Record
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={() => onDeleteRecord(record)}>
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
        <RecordForm
          onRecordChange={(newEditedRecord) => setEditedRecord(newEditedRecord)}
          onFormValidChanged={(isFormStillValid) =>
            setIsFormValid(isFormStillValid)
          }
          wallets={wallets}
          categories={categories}
          owner={owner}
          record={record}
          withNewCategory
        />
        {isLoading && <LinearProgress />}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDialogClose} variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => onEditRecord(editedRecord)}
          variant="contained"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
