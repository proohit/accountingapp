import { RecordDto } from './record.dto';

export class SearchQueryDto {
  sortBy?: keyof RecordDto;
  sortDirection?: 'asc' | 'desc';
  description?: RecordDto['description'];
  walletId?: RecordDto['walletId'];
  categoryId?: RecordDto['categoryId'];
  timestampFrom?: string;
  timestampTo?: string;
  page?: number;
  itemsPerPage?: number;
}
