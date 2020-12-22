import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

interface RecordAddDialogProps {
  onDialogClose(): void;
}

export const RecordAddDialog = (props: RecordAddDialogProps) => {
  const { onDialogClose } = props;

  return (
    <Dialog open={true} onClose={onDialogClose}>
      <DialogTitle>Add Record</DialogTitle>
      <DialogContent>...</DialogContent>
    </Dialog>
  );
};
