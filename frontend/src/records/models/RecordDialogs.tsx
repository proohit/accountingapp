import { RecordDto } from '@accountingapp/shared';

export interface RecordDialogs {
  ADD_RECORD: { open: boolean };
  EDIT_RECORD: { recordToEdit: RecordDto; open: boolean };
  FILTER_RECORDS: { open: boolean };
  SORT_RECORDS: { open: boolean };
  EXPORT_RECORDS: { open: boolean };
  IMPORT_RECORDS: { open: boolean };
}
