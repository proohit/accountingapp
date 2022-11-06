import { WalletDto } from '@accountingapp/shared';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { WalletsApiService } from '../services/WalletsApi';

const walletApi = new WalletsApiService();

export const useWalletsQuery = () => {
  return useQuery<WalletDto[]>(
    ['getWallets'],
    () => walletApi.getWalletsByUser(),
    {
      staleTime: 15000,
    }
  );
};
export const useCreateWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (walletToAdd: WalletDto) => walletApi.createWallet(walletToAdd),
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
    (editedWallet: WalletDto) => walletApi.editWallet(editedWallet),
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
    (walletToDelete: WalletDto) => walletApi.deleteWallet(walletToDelete.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getWallets');
      },
    }
  );
};
