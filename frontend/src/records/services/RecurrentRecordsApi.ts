import { ApiRoutes } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';
import {
  PlannedRecurrentRecord,
  RecurrentRecord,
} from '../models/RecurrentRecord';

export interface RecurrentRecordsApi {
  getRecordsByUser(): Promise<PlannedRecurrentRecord[]>;
  createRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord>;
  editRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord>;
  deleteRecord(recurrentRecordId: RecurrentRecord['id']): Promise<string>;
}

export class RecurrentRecordsApiService implements RecurrentRecordsApi {
  deleteRecord(recurrentRecordId: RecurrentRecord['id']): Promise<string> {
    return BASE_API.delete(
      `${ApiRoutes.RECURRENT_RECORDS}/${recurrentRecordId}`
    );
  }
  editRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord> {
    return BASE_API.put<RecurrentRecord, RecurrentRecord>(
      `${ApiRoutes.RECURRENT_RECORDS}/${recurrentRecord.id}`,
      recurrentRecord
    );
  }
  createRecord(recurrentRecord: RecurrentRecord): Promise<RecurrentRecord> {
    return BASE_API.post<RecurrentRecord, RecurrentRecord>(
      ApiRoutes.RECURRENT_RECORDS,
      recurrentRecord
    );
  }
  getRecordsByUser(): Promise<PlannedRecurrentRecord[]> {
    return BASE_API.get<PlannedRecurrentRecord[]>(ApiRoutes.RECURRENT_RECORDS);
  }
}
