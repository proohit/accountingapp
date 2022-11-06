import { ApiRoutes, WalletDto } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export interface WalletsApi {
  getWalletsByUser(): Promise<WalletDto[]>;
  createWallet(wallet: WalletDto): Promise<WalletDto>;
  editWallet(wallet: WalletDto): Promise<WalletDto>;
  deleteWallet(walletId: WalletDto['id']): Promise<string>;
}

export class WalletsApiService implements WalletsApi {
  createWallet(wallet: WalletDto): Promise<WalletDto> {
    return BASE_API.post<WalletDto, WalletDto>(`${ApiRoutes.WALLETS}`, wallet);
  }
  editWallet(wallet: WalletDto): Promise<WalletDto> {
    return BASE_API.put<WalletDto, WalletDto>(
      `${ApiRoutes.WALLETS}/${wallet.id}`,
      wallet
    );
  }
  deleteWallet(walletId: string): Promise<string> {
    return BASE_API.delete<string>(`${ApiRoutes.WALLETS}/${walletId}`);
  }
  async getWalletsByUser(): Promise<WalletDto[]> {
    const wallets = await BASE_API.get<WalletDto[]>(ApiRoutes.WALLETS);
    return wallets;
  }
}
