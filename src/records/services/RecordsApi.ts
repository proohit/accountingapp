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
  createRecord(token: string, record: Record): Promise<Record>;
  editRecord(token: string, record: Record): Promise<Record>;
  deleteRecord(token: string, recordId: Record['id']): Promise<string>;
}

export class RecordsApiService implements RecordsApi {
  deleteRecord(token: string, recordId: number): Promise<string> {
    return BASE_API.delete(`${API_ROUTES.RECORDS}/${recordId}`, token);
  }
  editRecord(token: string, record: Record): Promise<Record> {
    return BASE_API.put<Record, Record>(
      `${API_ROUTES.RECORDS}/${record.id}`,
      record,
      token
    );
  }
  createRecord(token: string, record: Record): Promise<Record> {
    return BASE_API.post<Record, Record>(API_ROUTES.RECORDS, record, token);
  }

  getRecordsByUser(
    token: string,
    query?: SearchQuery
  ): Promise<PaginatedResult> {
    return BASE_API.get<PaginatedResult>(API_ROUTES.RECORDS, token, [
      query.page >= 0 && ['page', query.page.toString()],
      query.itemsPerPage && ['itemsPerPage', query.itemsPerPage.toString()],
      query.sortBy && ['sortBy', query.sortBy],
      query.sortDirection && ['sortDirection', query.sortDirection],
    ]);
  }
}
