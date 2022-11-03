import { Record } from './record.model';

export interface PaginatedResult {
  data: Record[];
  page: number;
  dataCount: number;
  totalCount: number;
}
