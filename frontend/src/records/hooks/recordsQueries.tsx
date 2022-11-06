import { RecordDto, SearchQueryDto } from '@accountingapp/shared';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { RecordsApiService } from '../services/RecordsApi';

const recordsApi = new RecordsApiService();

export const useRecordsQuery = (query: SearchQueryDto) => {
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
    (recordToAdd: RecordDto) => recordsApi.createRecord(recordToAdd),
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
    (editedRecord: RecordDto) => recordsApi.editRecord(editedRecord),
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
    (recordToDelete: RecordDto) => recordsApi.deleteRecord(recordToDelete.id),
    {
      onSuccess: () => {
        invalidateQueries(queryClient);
      },
    }
  );
};

export const useCreateManyRecordsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recordsToAdd: RecordDto[]) => recordsApi.createManyRecords(recordsToAdd),
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
