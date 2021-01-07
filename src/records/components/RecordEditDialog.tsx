import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Wallet } from '../../wallets/models/Wallet';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { RecordForm } from './RecordForm';

interface RecordEditDialogProps {
  onDialogClose(): void;
  onEditRecord(editedRecord: Record): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
  record: Record;
}

export const RecordEditDialog = (props: RecordEditDialogProps) => {
  const {
    onDialogClose,
    wallets,
    onEditRecord,
    categories,
    owner,
    record,
  } = props;
  const [editedRecord, setEditedRecord] = useState<Record>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Edit Record</DialogTitle>
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
