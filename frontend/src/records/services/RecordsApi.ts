import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { PaginatedResult } from '../models/PaginatedResult';
import { Record } from '../models/Record';
import { SearchQuery } from '../models/SearchQuery';

export interface RecordsApi {
  getRecordsByUser(query?: SearchQuery): Promise<PaginatedResult>;
  createRecord(record: Record): Promise<Record>;
  editRecord(record: Record): Promise<Record>;
  deleteRecord(recordId: Record['id']): Promise<string>;
}

export class RecordsApiService implements RecordsApi {
  deleteRecord(recordId: number): Promise<string> {
    return BASE_API.delete(`${API_ROUTES.RECORDS}/${recordId}`);
  }
  editRecord(record: Record): Promise<Record> {
    return BASE_API.put<Record, Record>(
      `${API_ROUTES.RECORDS}/${record.id}`,
      record
    );
  }
  createRecord(record: Record): Promise<Record> {
    return BASE_API.post<Record, Record>(API_ROUTES.RECORDS, record);
  }

  getRecordsByUser(query?: SearchQuery): Promise<PaginatedResult> {
    return BASE_API.get<PaginatedResult>(API_ROUTES.RECORDS, [
      query.page >= 0 && ['page', query.page.toString()],
      query.itemsPerPage && ['itemsPerPage', query.itemsPerPage.toString()],
      query.sortBy && ['sortBy', query.sortBy],
      query.sortDirection && ['sortDirection', query.sortDirection],
      query.filterBy?.categoryId && ['categoryId', query.filterBy.categoryId],
      query.filterBy?.walletId && ['walletId', query.filterBy.walletId],
      query.filterBy?.description && [
        'description',
        query.filterBy.description,
      ],
      query.filterBy?.timestampFrom && [
        'timestampFrom',
        query.filterBy.timestampFrom,
      ],
      query.filterBy?.timestampTo && [
        'timestampTo',
        query.filterBy.timestampTo,
      ],
    ]);
  }

  checkIfExternalReferencesExist(references: string[]): Promise<string[]> {
    return BASE_API.post<{ references: string[] }, string[]>(
      API_ROUTES.RECORDS_CHECK_EXTERNAL_REFERENCES,
      { references }
    );
  }

  createManyRecords(records: Record[]): Promise<Record[]> {
    return BASE_API.post<Record[], Record[]>(
      API_ROUTES.RECORDS_BULK_CREATE,
      records
    );
  }
}
