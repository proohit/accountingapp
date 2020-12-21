import { Record } from './Record';

export interface SearchQuery {
  sortBy?: keyof Record;
  sortDirection?: 'asc' | 'desc';
  page: number;
  itemsPerPage: number;
}
