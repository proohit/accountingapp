import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Order } from '../../shared/models/SortOrder';
import { Record } from '../models/Record';
import { RecordsApiService } from '../services/RecordsApi';

const recordsApi = new RecordsApiService();

export const useRecordsQuery = (
  page: number,
  rowsPerPage: number,
  orderBy: keyof Record,
  order: Order,
  token: string
) => {
  return useQuery(
    ['getRecord', page, rowsPerPage, orderBy, order],
    () =>
      recordsApi.getRecordsByUser(token, {
        page,
        itemsPerPage: rowsPerPage,
        sortBy: orderBy,
        sortDirection: orderBy && order,
      }),
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
