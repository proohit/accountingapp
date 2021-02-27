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

interface RecordAddDialogProps {
  onDialogClose(): void;
  onAddRecord(recordToAdd: Record): void;
  wallets: Wallet[];
  categories: Category[];
  owner: string;
}

export const RecordAddDialog = (props: RecordAddDialogProps) => {
  const { onDialogClose, wallets, onAddRecord, categories, owner } = props;
  const [recordToAdd, setRecordToAdd] = useState<Record>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Add Record</DialogTitle>
      <DialogContent>
        <RecordForm
          onRecordChange={(record) => setRecordToAdd(record)}
          onFormValidChanged={(isFormStillValid) =>
            setIsFormValid(isFormStillValid)
          }
          wallets={wallets}
          categories={categories}
          owner={owner}
          withNewCategory
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
          onClick={() => onAddRecord(recordToAdd)}
          variant="contained"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
