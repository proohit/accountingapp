import React, { Fragment, useContext } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import {
  useCreateRecordMutation,
  useEditRecordMutation,
} from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import { RecordListContext } from './RecordList';

export const RecordDialogContainer = () => {
  const { username, token } = useAuthentication();
  const recordListContext = useContext(RecordListContext);
  const {
    dialogs: { ADD_RECORD, EDIT_RECORD },
    closeDialog,
  } = useDialogs();

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);
  const createRecordMutation = useCreateRecordMutation(token);
  const editRecordMutation = useEditRecordMutation(token);

  const addRecord = async (recordToAdd: Record) => {
    await createRecordMutation.mutateAsync(recordToAdd);
    closeDialog(Dialogs.addRecord);
  };

  const editRecord = async (editedRecord: Record) => {
    await editRecordMutation.mutateAsync(editedRecord);
    closeDialog(Dialogs.editRecord);
  };

  if (ADD_RECORD) {
    return (
      <RecordAddDialog
        owner={username}
        onDialogClose={() => closeDialog(Dialogs.addRecord)}
        onAddRecord={addRecord}
        wallets={wallets}
        categories={categories}
      />
    );
  }

  if (EDIT_RECORD) {
    return (
      <RecordEditDialog
        record={recordListContext.selectedRecord}
        categories={categories}
        owner={username}
        onDialogClose={() => closeDialog(Dialogs.editRecord)}
        onEditRecord={editRecord}
        wallets={wallets}
      />
    );
  }

  return <Fragment />;
};
