import { Record } from '../../entity/Record';

export interface SearchQuery {
    sortBy?: keyof Record;
    sortDirection?: 'asc' | 'desc';
    filterBy?: {
        description?: Record['description'];
        walletId?: Record['walletId'];
        categoryId?: Record['categoryId'];
        timestampFrom?: string;
        timestampTo?: string;
    };
    page?: number;
    itemsPerPage?: number;
}
