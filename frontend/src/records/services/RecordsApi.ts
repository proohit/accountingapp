import {
  ApiRoutes,
  PaginatedResultDto,
  RecordDto,
  SearchQueryDto,
} from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export interface RecordsApi {
  getRecordsByUser(query?: SearchQueryDto): Promise<PaginatedResultDto>;
  createRecord(record: RecordDto): Promise<RecordDto>;
  editRecord(record: RecordDto): Promise<RecordDto>;
  deleteRecord(recordId: RecordDto['id']): Promise<string>;
}

export class RecordsApiService implements RecordsApi {
  deleteRecord(recordId: string): Promise<string> {
    return BASE_API.delete(`${ApiRoutes.RECORDS}/${recordId}`);
  }
  editRecord(record: RecordDto): Promise<RecordDto> {
    console.log(record);
    return BASE_API.put<RecordDto, RecordDto>(
      `${ApiRoutes.RECORDS}/${record.id}`,
      record
    );
  }
  createRecord(record: RecordDto): Promise<RecordDto> {
    return BASE_API.post<RecordDto, RecordDto>(ApiRoutes.RECORDS, record);
  }

  getRecordsByUser(query?: SearchQueryDto): Promise<PaginatedResultDto> {
    return BASE_API.get<PaginatedResultDto>(ApiRoutes.RECORDS, [
      query.page >= 0 && ['page', query.page.toString()],
      query.itemsPerPage && ['itemsPerPage', query.itemsPerPage.toString()],
      query.sortBy && ['sortBy', query.sortBy],
      query.sortDirection && ['sortDirection', query.sortDirection],
      query.categoryId && ['categoryId', query.categoryId],
      query.walletId && ['walletId', query.walletId],
      query.description && ['description', query.description],
      query.timestampFrom && ['timestampFrom', query.timestampFrom],
      query.timestampTo && ['timestampTo', query.timestampTo],
    ]);
  }

  checkIfExternalReferencesExist(references: string[]): Promise<string[]> {
    return BASE_API.post<{ references: string[] }, string[]>(
      ApiRoutes.RECORDS_CHECK_EXTERNAL_REFERENCES,
      { references }
    );
  }

  createManyRecords(records: RecordDto[]): Promise<RecordDto[]> {
    return BASE_API.post<{ records: RecordDto[] }, RecordDto[]>(
      ApiRoutes.RECORDS_BULK_CREATE,
      {
        records,
      }
    );
  }
}
