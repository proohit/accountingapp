import { Record } from './Record';

export interface RecordDialogs {
  ADD_RECORD: { open: boolean };
  EDIT_RECORD: { recordToEdit: Record; open: boolean };
  FILTER_RECORDS: { open: boolean };
  SORT_RECORDS: { open: boolean };
  EXPORT_RECORDS: { open: boolean };
}
