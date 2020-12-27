import React, { Fragment, useContext, useEffect } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { useWallets } from '../../wallets/hooks/useWallets';
import { useCategories } from '../hooks/useCategories';
import { useRecords } from '../hooks/useRecords';
import { Record } from '../models/Record';
import { RecordsApiService } from '../services/RecordsApi';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import { RecordListContext } from './RecordList';

export const RecordDialogContainer = () => {
  const { username, token } = useAuthentication();
  const { wallets, getWallets } = useWallets();
  const { categories, getCategories } = useCategories();
  const { getRecords } = useRecords();
  const recordListContext = useContext(RecordListContext);
  const recordsApi = new RecordsApiService();
  const {
    dialogs: { ADD_RECORD, EDIT_RECORD },
    closeDialog,
  } = useDialogs();

  useEffect(() => {
    if (!wallets) {
      getWallets();
    }
  }, [wallets]);

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, [categories]);

  const addRecord = async (recordToAdd: Record) => {
    await recordsApi.createRecord(token, recordToAdd);
    getRecords({
      itemsPerPage: recordListContext.rowsPerPage,
      page: recordListContext.page,
      sortBy: recordListContext.orderBy,
      sortDirection: recordListContext.order,
    });
    closeDialog(Dialogs.addRecord);
  };

  const editRecord = (editedRecord: Record) => {};

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
