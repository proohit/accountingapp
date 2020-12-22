import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { Wallet } from '../models/Wallet';

export interface WalletsApi {
  getWalletsByUser(token: string): Promise<Wallet[]>;
}

export class WalletsApiService implements WalletsApi {
  async getWalletsByUser(token: string): Promise<Wallet[]> {
    const wallets = await BASE_API.get<Wallet[]>(API_ROUTES.WALLETS, token);
    return wallets;
  }
}
