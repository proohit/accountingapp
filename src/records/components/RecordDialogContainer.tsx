import React, { Fragment } from 'react';
import { useDialogs } from '../../shared/hooks/useDialogs';
import { Dialogs } from '../../shared/models/DialogContextModel';
import { RecordAddDialog } from './RecordAddDialog';

export const RecordDialogContainer = (props) => {
  const {
    dialogs: { ADD_RECORD },
    closeDialog,
  } = useDialogs();
  if (ADD_RECORD) {
    return (
      <RecordAddDialog onDialogClose={() => closeDialog(Dialogs.addRecord)} />
    );
  }

  return <Fragment />;
};
