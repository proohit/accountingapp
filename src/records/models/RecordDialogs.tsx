import { Record } from './Record';

export interface RecordDialogs {
  ADD_RECORD: { open: boolean };
  EDIT_RECORD: { recordToEdit: Record; open: boolean };
  FILTER_RECORDS: { open: boolean };
}
