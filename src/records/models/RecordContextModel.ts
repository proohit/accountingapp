import { Record } from './Record';

export interface RecordContextModel {
  records: Record[];
  setRecords: (records: Record[]) => void;
  refreshRecords: () => void;
}
