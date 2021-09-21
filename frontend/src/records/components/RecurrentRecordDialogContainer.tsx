import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { recurrentRecordsDialogsState } from '../hooks/recurrentRecordsStore';
import RecurrentRecordAddDialog from './RecurrentRecordAddDialog';

export const RecurrentRecordDialogContainer: FunctionComponent = (props) => {
  const recurrentRecordsDialogs = useRecoilValue(recurrentRecordsDialogsState);

  if (recurrentRecordsDialogs.ADD_RECURRENT_RECORD.open) {
    return <RecurrentRecordAddDialog />;
  }

  return <Fragment />;
};
