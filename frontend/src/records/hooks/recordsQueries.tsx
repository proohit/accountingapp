import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Record } from '../models/Record';
import { SearchQuery } from '../models/SearchQuery';
import { RecordsApiService } from '../services/RecordsApi';

const recordsApi = new RecordsApiService();

export const useRecordsQuery = (query: SearchQuery) => {
  return useQuery(
    ['getRecord', query],
    () => recordsApi.getRecordsByUser(query),
    {
      keepPreviousData: true,
      staleTime: 15000,
    }
  );
};

export const useCreateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordToAdd: Record) => recordsApi.createRecord(recordToAdd),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};

export const useEditRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (editedRecord: Record) => recordsApi.editRecord(editedRecord),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordToDelete: Record) => recordsApi.deleteRecord(recordToDelete.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecord');
      },
    }
  );
};
