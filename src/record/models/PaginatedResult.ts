import { Record } from '../../entity/Record';

export interface PaginatedResult {
    data: Record[];
    page: number;
    dataCount: number;
    totalCount: number;
}
