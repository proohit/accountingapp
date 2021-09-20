import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RecurrentRecord } from '../models/RecurrentRecord';
import { RecurrentRecordsApiService } from '../services/RecurrentRecordsApi';

const recurrentRecordsApi = new RecurrentRecordsApiService();

export const useRecurrentRecordsQuery = () => {
  return useQuery(['getRecurrentRecords'], () =>
    recurrentRecordsApi.getRecordsByUser()
  );
};

export const useCreateRecurrentRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recurrentRecord: RecurrentRecord) =>
      recurrentRecordsApi.createRecord(recurrentRecord),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecurrentRecords');
      },
    }
  );
};

export const useEditRecurrentRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recurrentRecord: RecurrentRecord) =>
      recurrentRecordsApi.editRecord(recurrentRecord),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecurrentRecords');
      },
    }
  );
};

export const useDeleteRecurrentRecordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (recurrentRecord: RecurrentRecord) =>
      recurrentRecordsApi.deleteRecord(recurrentRecord.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getRecurrentRecords');
      },
    }
  );
};
