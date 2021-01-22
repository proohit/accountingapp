import { atom, DefaultValue, selector } from 'recoil';
import { RecordDialogs } from '../models/RecordDialogs';

const recordsDialogsState = atom<RecordDialogs>({
  key: 'recordsDialogs',
  default: {
    ADD_RECORD: { open: false },
    EDIT_RECORD: { open: false, recordToEdit: null },
  },
});

export const addRecordDialogState = selector<RecordDialogs['ADD_RECORD']>({
  key: 'addRecordDialogState',
  get: ({ get }) => get(recordsDialogsState).ADD_RECORD,
  set: ({ get, set }, addDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      addDialogState instanceof DefaultValue
        ? addDialogState
        : { ...dialogsState, ADD_RECORD: addDialogState }
    );
  },
});

export const editRecordDialogState = selector<RecordDialogs['EDIT_RECORD']>({
  key: 'editRecordDialogState',
  get: ({ get }) => get(recordsDialogsState).EDIT_RECORD,
  set: ({ get, set }, editDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      editDialogState instanceof DefaultValue
        ? editDialogState
        : { ...dialogsState, EDIT_RECORD: editDialogState }
    );
  },
});
