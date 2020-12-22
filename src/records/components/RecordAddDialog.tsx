import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Record } from '../models/Record';
import { RecordForm } from './RecordForm';

interface RecordAddDialogProps {
  onDialogClose(): void;
}

export const RecordAddDialog = (props: RecordAddDialogProps) => {
  const { onDialogClose } = props;
  const [recordToAdd, setRecordToAdd] = useState<Record>(null);

  const addRecord = () => {};
  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Add Record</DialogTitle>
      <DialogContent>
        {<RecordForm onChange={(record) => setRecordToAdd(record)} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDialogClose()}>Cancel</Button>
        <Button onClick={addRecord}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
