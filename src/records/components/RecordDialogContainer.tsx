import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import {
  addRecordDialogState,
  editRecordDialogState,
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

export const RecordDialogContainer: FunctionComponent = (props) => {
  const { username, token } = useAuthentication();
  const [editRecordsDialog, setEditRecordsDialog] = useRecoilState(
    editRecordDialogState
  );
  const [addRecordsDialog, setAddRecordsDialog] = useRecoilState(
    addRecordDialogState
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

  return <Fragment />;
};
