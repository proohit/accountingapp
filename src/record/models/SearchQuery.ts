import Record from './Record';

export interface SearchQuery {
    sortBy?: keyof Record;
    sortDirection?: 'asc' | 'desc';
    from: number;
    to: number;
}
