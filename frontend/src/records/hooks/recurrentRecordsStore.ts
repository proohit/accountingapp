import { atom } from 'recoil';
import { RecurrentRecordDialogs } from '../models/RecurrentRecordDialogs';

export const recurrentRecordsDialogsState = atom<RecurrentRecordDialogs>({
  key: 'recurrentRecordsDialogs',
  default: {
    ADD_RECURRENT_RECORD: { open: false },
    EDIT_RECURRENT_RECORD: { open: false, recordToEdit: null },
  },
});
