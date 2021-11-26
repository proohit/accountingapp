import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { Record } from '../models/Record';
import { SearchQuery } from '../models/SearchQuery';
import { RecordsApiService } from '../services/RecordsApi';

const recordsApi = new RecordsApiService();

export const useRecordsQuery = (query: SearchQuery) => {
  return useQuery(
    ['getRecord', query],
    () => recordsApi.getRecordsByUser(query),
    {
      staleTime: 15000,
      keepPreviousData: true,
    }
  );
};

export const useCreateRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordToAdd: Record) => recordsApi.createRecord(recordToAdd),
    {
      onSuccess: () => {
        invalidateQueries(queryClient);
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
        invalidateQueries(queryClient);
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
        invalidateQueries(queryClient);
      },
    }
  );
};

const invalidateQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries('getRecord');
  queryClient.invalidateQueries('getMonthlyCategoryData');
  queryClient.invalidateQueries('getMonthStatusData');
  queryClient.invalidateQueries('getMonthlyData');
  queryClient.invalidateQueries('getDailyData');
};
