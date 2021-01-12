import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { Wallet } from '../models/Wallet';

export interface WalletsApi {
  getWalletsByUser(token: string): Promise<Wallet[]>;
  createWallet(token: string, wallet: Wallet): Promise<Wallet>;
  editWallet(token: string, wallet: Wallet): Promise<Wallet>;
  deleteWallet(token: string, walletId: Wallet['id']): Promise<string>;
}

export class WalletsApiService implements WalletsApi {
  createWallet(token: string, wallet: Wallet): Promise<Wallet> {
    return BASE_API.post<Wallet, Wallet>(
      `${API_ROUTES.WALLETS}`,
      wallet,
      token
    );
  }
  editWallet(token: string, wallet: Wallet): Promise<Wallet> {
    return BASE_API.put<Wallet, Wallet>(
      `${API_ROUTES.WALLETS}/${wallet.id}`,
      wallet,
      token
    );
  }
  deleteWallet(token: string, walletId: string): Promise<string> {
    return BASE_API.delete<string>(`${API_ROUTES.WALLETS}/${walletId}`, token);
  }
  async getWalletsByUser(token: string): Promise<Wallet[]> {
    const wallets = await BASE_API.get<Wallet[]>(API_ROUTES.WALLETS, token);
    return wallets;
  }
}
