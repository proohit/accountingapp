import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { recordsDialogsState } from '../hooks/recordsDialogsState';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import RecordExportContainer from './RecordExportContainer';
import { RecordFilterBarContainer } from './RecordFilterBarContainer';
import RecordImportContainer from './RecordImportContainer';
import RecordSortContainer from './RecordSortContainer';

export const RecordDialogContainer = () => {
  const [recordsDialog, setRecordsDialog] = useRecoilState(recordsDialogsState);

  if (recordsDialog.ADD_RECORD.open) {
    return <RecordAddDialog />;
  }

  if (recordsDialog.EDIT_RECORD.open) {
    return <RecordEditDialog />;
  }

  if (recordsDialog.FILTER_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            FILTER_RECORDS: { open: false },
          })
        }
      >
        <DialogContent>
          <RecordFilterBarContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (recordsDialog.SORT_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({ ...recordsDialog, SORT_RECORDS: { open: false } })
        }
      >
        <DialogTitle>Sort Records</DialogTitle>
        <DialogContent>
          <RecordSortContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (recordsDialog.EXPORT_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            EXPORT_RECORDS: { open: false },
          })
        }
      >
        <DialogTitle>Export Records</DialogTitle>
        <DialogContent>
          <RecordExportContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (recordsDialog.IMPORT_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            IMPORT_RECORDS: { open: false },
          })
        }
      >
        <DialogTitle>Import Records</DialogTitle>
        <DialogContent>
          <RecordImportContainer />
        </DialogContent>
      </Dialog>
    );
  }
  return <Fragment />;
};
