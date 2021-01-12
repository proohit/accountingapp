import React, { Fragment } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { UseDialogs } from '../../shared/hooks/useDialogs';
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
import { RecordDialogs } from '../models/RecordDialogs';

type RecordDialogContainerProps = {
  dialogsState: UseDialogs<RecordDialogs>;
};

export const RecordDialogContainer = (props: RecordDialogContainerProps) => {
  const { username, token } = useAuthentication();
  const {
    dialogsState: { dialogs, setSingleDialog },
  } = props;

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const createRecordMutation = useCreateRecordMutation(token);
  const editRecordMutation = useEditRecordMutation(token);
  const deleteRecordMutation = useDeleteRecordMutation(token);

  const addRecord = async (recordToAdd: Record) => {
    await createRecordMutation.mutateAsync(recordToAdd);
    setSingleDialog('ADD_RECORD', { open: false });
  };

  const editRecord = async (editedRecord: Record) => {
    await editRecordMutation.mutateAsync(editedRecord);
    setSingleDialog('EDIT_RECORD', { open: false, recordToEdit: null });
  };

  const deleteRecord = async (recordToDelete: Record) => {
    await deleteRecordMutation.mutateAsync(recordToDelete);
    setSingleDialog('EDIT_RECORD', { open: false, recordToEdit: null });
  };

  if (dialogs.ADD_RECORD.open) {
    return (
      <RecordAddDialog
        owner={username}
        onDialogClose={() => setSingleDialog('ADD_RECORD', { open: false })}
        onAddRecord={addRecord}
        wallets={wallets}
        categories={categories}
      />
    );
  }

  if (dialogs.EDIT_RECORD.open) {
    return (
      <RecordEditDialog
        record={dialogs.EDIT_RECORD.recordToEdit}
        categories={categories}
        owner={username}
        onDialogClose={() =>
          setSingleDialog('EDIT_RECORD', { open: false, recordToEdit: null })
        }
        onEditRecord={editRecord}
        onDeleteRecord={deleteRecord}
        wallets={wallets}
      />
    );
  }

  return <Fragment />;
};
