import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import {
  addRecordDialogState,
  editRecordDialogState,
  filterRecordDialogState,
} from '../hooks/recordsDialogsState';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import {
  useCreateRecordMutation,
  useDeleteRecordMutation,
  useEditRecordMutation,
} from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { RecordFilterBarContainer } from './RecordFilterBarContainer';

export const RecordDialogContainer: FunctionComponent = (props) => {
  const { username, token } = useAuthentication();
  const [editRecordsDialog, setEditRecordsDialog] = useRecoilState(
    editRecordDialogState
  );
  const [addRecordsDialog, setAddRecordsDialog] = useRecoilState(
    addRecordDialogState
  );
  const [filterRecordsDialog, setFilterRecordsDialog] = useRecoilState(
    filterRecordDialogState
  );
  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const createRecordMutation = useCreateRecordMutation(token);
  const editRecordMutation = useEditRecordMutation(token);
  const deleteRecordMutation = useDeleteRecordMutation(token);

  const addRecord = async (recordToAdd: Record) => {
    await createRecordMutation.mutateAsync(recordToAdd);
    setAddRecordsDialog({ open: false });
  };

  const editRecord = async (editedRecord: Record) => {
    await editRecordMutation.mutateAsync(editedRecord);
    setEditRecordsDialog({ open: false, recordToEdit: null });
  };

  const deleteRecord = async (recordToDelete: Record) => {
    await deleteRecordMutation.mutateAsync(recordToDelete);
    setEditRecordsDialog({ open: false, recordToEdit: null });
  };

  if (addRecordsDialog.open) {
    return (
      <RecordAddDialog
        owner={username}
        onDialogClose={() => setAddRecordsDialog({ open: false })}
        onAddRecord={addRecord}
        wallets={wallets}
        categories={categories}
      />
    );
  }

  if (editRecordsDialog.open) {
    return (
      <RecordEditDialog
        record={editRecordsDialog.recordToEdit}
        categories={categories}
        owner={username}
        onDialogClose={() =>
          setEditRecordsDialog({ open: false, recordToEdit: null })
        }
        onEditRecord={editRecord}
        onDeleteRecord={deleteRecord}
        wallets={wallets}
      />
    );
  }

  if (filterRecordsDialog.open) {
    return (
      <Dialog
        open={true}
        onClose={() => setFilterRecordsDialog({ open: false })}
      >
        <DialogTitle>Filter Records</DialogTitle>
        <DialogContent>
          <RecordFilterBarContainer />
        </DialogContent>
      </Dialog>
    );
  }

  return <Fragment />;
};
