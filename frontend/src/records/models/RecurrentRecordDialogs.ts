import { RecurrentRecord } from './RecurrentRecord';

export interface RecurrentRecordDialogs {
  ADD_RECURRENT_RECORD: { open: boolean };
  EDIT_RECURRENT_RECORD: { recordToEdit: RecurrentRecord; open: boolean };
}
