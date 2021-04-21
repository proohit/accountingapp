import { Record } from './Record';
import { SearchQuery } from './SearchQuery';

export interface RecordContextModel {
  records: Record[];
  totalRecords: number;
  setRecords: (records: Record[]) => void;
  refreshRecords: () => void;
  getRecords(query: SearchQuery): void;
}
