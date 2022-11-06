import { RecordDto, SearchQueryDto } from '@accountingapp/shared';

export interface RecordContextModel {
  records: RecordDto[];
  totalRecords: number;
  setRecords: (records: RecordDto[]) => void;
  refreshRecords: () => void;
  getRecords(query: SearchQueryDto): void;
}
