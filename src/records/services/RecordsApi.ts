import { Record } from '../models/Record';
import { BASE_API } from '../../shared/models/Api';
import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { SearchQuery } from '../models/SearchQuery';
import { PaginatedResult } from '../models/PaginatedResult';

export interface RecordsApi {
  getRecordsByUser(
    token: string,
    query?: SearchQuery
  ): Promise<PaginatedResult>;
}

export class RecordsApiService implements RecordsApi {
  async getRecordsByUser(
    token: string,
    query?: SearchQuery
  ): Promise<PaginatedResult> {
    const paginatedRecords = await BASE_API.get<PaginatedResult>(
      API_ROUTES.RECORDS,
      token,
      [
        query.page >= 0 && ['page', query.page.toString()],
        query.itemsPerPage && ['itemsPerPage', query.itemsPerPage.toString()],
        query.sortBy && ['sortBy', query.sortBy],
        query.sortDirection && ['sortDirection', query.sortDirection],
      ]
    );
    return paginatedRecords;
  }
}
