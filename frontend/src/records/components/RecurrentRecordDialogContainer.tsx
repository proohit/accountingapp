import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { recurrentRecordsDialogsState } from '../hooks/recurrentRecordsStore';
import RecurrentRecordAddDialog from './RecurrentRecordAddDialog';
import RecurrentRecordEditDialog from './RecurrentRecordEditDialog';

export const RecurrentRecordDialogContainer: FunctionComponent = (props) => {
  const recurrentRecordsDialogs = useRecoilValue(recurrentRecordsDialogsState);

  if (recurrentRecordsDialogs.ADD_RECURRENT_RECORD.open) {
    return <RecurrentRecordAddDialog />;
  }
  if (recurrentRecordsDialogs.EDIT_RECURRENT_RECORD.open) {
    return <RecurrentRecordEditDialog />;
  }

  return <Fragment />;
};
