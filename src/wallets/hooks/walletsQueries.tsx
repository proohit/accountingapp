import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Wallet } from '../models/Wallet';
import { WalletsApiService } from '../services/WalletsApi';

const walletApi = new WalletsApiService();

export const useWalletsQuery = () => {
  return useQuery<Wallet[]>(
    ['getWallets'],
    () => walletApi.getWalletsByUser(),
    { initialData: [] }
  );
};
export const useCreateWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (walletToAdd: Wallet) => walletApi.createWallet(walletToAdd),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};

export const useEditWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (editedWallet: Wallet) => walletApi.editWallet(editedWallet),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};

export const useDeleteWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (walletToDelete: Wallet) => walletApi.deleteWallet(walletToDelete.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};
