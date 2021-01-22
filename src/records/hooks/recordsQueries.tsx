import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Record } from '../models/Record';
import { SearchQuery } from '../models/SearchQuery';
import { RecordsApiService } from '../services/RecordsApi';

const recordsApi = new RecordsApiService();

export const useRecordsQuery = (query: SearchQuery, token: string) => {
  return useQuery(
    ['getRecord', query],
    () => recordsApi.getRecordsByUser(token, query),
    { keepPreviousData: true }
  );
};

export const useCreateRecordMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordToAdd: Record) => recordsApi.createRecord(token, recordToAdd),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};

export const useEditRecordMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (editedRecord: Record) => recordsApi.editRecord(token, editedRecord),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};

export const useDeleteRecordMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordToDelete: Record) =>
      recordsApi.deleteRecord(token, recordToDelete.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};
