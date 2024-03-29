import { atom, DefaultValue, selector } from 'recoil';
import { RecordDialogs } from '../models/RecordDialogs';

export const recordsDialogsState = atom<RecordDialogs>({
  key: 'recordsDialogs',
  default: {
    ADD_RECORD: { open: false },
    EDIT_RECORD: { open: false, recordToEdit: null },
    FILTER_RECORDS: { open: false },
    SORT_RECORDS: { open: false },
    EXPORT_RECORDS: { open: false },
    IMPORT_RECORDS: { open: false },
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

export const filterRecordDialogState = selector<
  RecordDialogs['FILTER_RECORDS']
>({
  key: 'filterRecordsDialogState',
  get: ({ get }) => get(recordsDialogsState).FILTER_RECORDS,
  set: ({ get, set }, filterDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      filterDialogState instanceof DefaultValue
        ? filterDialogState
        : { ...dialogsState, FILTER_RECORDS: filterDialogState }
    );
  },
});

export const sortRecordDialogState = selector<RecordDialogs['SORT_RECORDS']>({
  key: 'sortRecordsDialogState',
  get: ({ get }) => get(recordsDialogsState).SORT_RECORDS,
  set: ({ get, set }, sortDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      sortDialogState instanceof DefaultValue
        ? sortDialogState
        : { ...dialogsState, SORT_RECORDS: sortDialogState }
    );
  },
});

export const exportRecordDialogState = selector<
  RecordDialogs['EXPORT_RECORDS']
>({
  key: 'exportRecordsDialogState',
  get: ({ get }) => get(recordsDialogsState).EXPORT_RECORDS,
  set: ({ get, set }, exportDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      exportDialogState instanceof DefaultValue
        ? exportDialogState
        : { ...dialogsState, EXPORT_RECORDS: exportDialogState }
    );
  },
});

export const importRecordDialogState = selector<
  RecordDialogs['IMPORT_RECORDS']
>({
  key: 'importRecordsDialogState',
  get: ({ get }) => get(recordsDialogsState).IMPORT_RECORDS,
  set: ({ get, set }, importDialogState) => {
    const dialogsState = get(recordsDialogsState);
    set(
      recordsDialogsState,
      importDialogState instanceof DefaultValue
        ? importDialogState
        : { ...dialogsState, IMPORT_RECORDS: importDialogState }
    );
  },
});
