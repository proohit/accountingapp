import { Record } from './Record';

export interface PaginatedResult {
  data: Record[];
  page: number;
  dataCount: number;
  totalCount: number;
}
