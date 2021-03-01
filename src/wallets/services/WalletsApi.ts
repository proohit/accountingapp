import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { Wallet } from '../models/Wallet';

export interface WalletsApi {
  getWalletsByUser(): Promise<Wallet[]>;
  createWallet(wallet: Wallet): Promise<Wallet>;
  editWallet(wallet: Wallet): Promise<Wallet>;
  deleteWallet(walletId: Wallet['id']): Promise<string>;
}

export class WalletsApiService implements WalletsApi {
  createWallet(wallet: Wallet): Promise<Wallet> {
    return BASE_API.post<Wallet, Wallet>(`${API_ROUTES.WALLETS}`, wallet);
  }
  editWallet(wallet: Wallet): Promise<Wallet> {
    return BASE_API.put<Wallet, Wallet>(
      `${API_ROUTES.WALLETS}/${wallet.id}`,
      wallet
    );
  }
  deleteWallet(walletId: string): Promise<string> {
    return BASE_API.delete<string>(`${API_ROUTES.WALLETS}/${walletId}`);
  }
  async getWalletsByUser(): Promise<Wallet[]> {
    const wallets = await BASE_API.get<Wallet[]>(API_ROUTES.WALLETS);
    return wallets;
  }
}
