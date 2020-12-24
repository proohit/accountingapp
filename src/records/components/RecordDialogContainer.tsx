import React, { Fragment, useEffect } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { useWallets } from '../../wallets/hooks/useWallets';
import { useCategories } from '../hooks/useCategories';
import { Record } from '../models/Record';
import { RecordAddDialog } from './RecordAddDialog';

export const RecordDialogContainer = () => {
  const { username } = useAuthentication();
  const { wallets, getWallets } = useWallets();
  const { categories, getCategories } = useCategories();

  const {
    dialogs: { ADD_RECORD },
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

  const addRecord = (recordToAdd: Record) => {};

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

  return <Fragment />;
};
