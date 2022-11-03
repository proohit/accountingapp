import { Record } from './record.model';

export class SearchQuery {
  sortBy?: keyof Record;
  sortDirection?: 'asc' | 'desc';
  description?: Record['description'];
  walletId?: Record['walletId'];
  categoryId?: Record['categoryId'];
  timestampFrom?: string;
  timestampTo?: string;
  page?: number;
  itemsPerPage?: number;
}
