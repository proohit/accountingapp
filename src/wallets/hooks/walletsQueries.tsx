import { useQuery } from 'react-query';
import { WalletsApiService } from '../services/WalletsApi';

const walletApi = new WalletsApiService();

export const useWalletsQuery = (token: string) => {
  return useQuery(['getWallets', token], () =>
    walletApi.getWalletsByUser(token)
  );
};
