import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { RecurrentRecord } from '../models/RecurrentRecord';

export interface RecurrentRecordsApi {
  getRecordsByUser(): Promise<RecurrentRecord[]>;
  createRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord>;
  editRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord>;
  deleteRecord(recurrentRecordId: RecurrentRecord['id']): Promise<string>;
}

export class RecurrentRecordsApiService implements RecurrentRecordsApi {
  deleteRecord(recurrentRecordId: RecurrentRecord['id']): Promise<string> {
    return BASE_API.delete(
      `${API_ROUTES.RECURRENT_RECORDS}/${recurrentRecordId}`
    );
  }
  editRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord> {
    return BASE_API.put<RecurrentRecord, RecurrentRecord>(
      `${API_ROUTES.RECURRENT_RECORDS}/${recurrentRecord.id}`,
      recurrentRecord
    );
  }
  createRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord> {
    return BASE_API.post<RecurrentRecord, RecurrentRecord>(
      API_ROUTES.RECURRENT_RECORDS,
      recurrentRecord
    );
  }
  getRecordsByUser(): Promise<RecurrentRecord[]> {
    return BASE_API.get<RecurrentRecord[]>(API_ROUTES.RECURRENT_RECORDS);
  }
}
