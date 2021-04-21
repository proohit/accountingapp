import { Record } from './Record';

export interface SearchQuery {
  sortBy?: keyof Record;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  itemsPerPage?: number;
  filterBy?: {
    walletId?: string;
    categoryId?: string;
    description?: string;
    timestampFrom?: string;
    timestampTo?: string;
  };
}
