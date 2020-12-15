import { Record } from '../models/Record';
import { BASE_API } from '../../shared/models/Api';
import { API_ROUTES } from '../../shared/constants/ApiRoutes';

export interface RecordsApi {
  getRecordsByUser(token: string, page?: number): Promise<Record[]>;
}

export interface PaginatedRecords {
  data: Record[];
  page: number;
  total: number;
}

export class RecordsApiService implements RecordsApi {
  async getRecordsByUser(token: string, page?: number): Promise<Record[]> {
    const paginatedRecords = await BASE_API.get<PaginatedRecords>(
      API_ROUTES.RECORDS,
      token,
      [
        ['page', page ? page.toString() : '0'],
        ['itemsPerPage', '10000'],
      ]
    );
    return paginatedRecords.data;
  }
}
