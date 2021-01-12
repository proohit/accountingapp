import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Wallet } from '../models/Wallet';
import { WalletsApiService } from '../services/WalletsApi';

const walletApi = new WalletsApiService();

export const useWalletsQuery = (token: string) => {
  return useQuery(['getWallets', token], () =>
    walletApi.getWalletsByUser(token)
  );
};
export const useCreateWalletMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (walletToAdd: Wallet) => walletApi.createWallet(token, walletToAdd),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};

export const useEditWalletMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (editedWallet: Wallet) => walletApi.editWallet(token, editedWallet),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};

export const useDeleteWalletMutation = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (walletToDelete: Wallet) =>
      walletApi.deleteWallet(token, walletToDelete.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};
