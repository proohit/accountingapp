import { WalletDto as Wallet } from '@accountingapp/shared';

export class WalletUtils {
  public static getWalletByName(wallets: Wallet[], walletName: Wallet['name']) {
    return wallets?.find((wallet) => wallet.name === walletName);
  }

  public static getWalletById(wallets: Wallet[], walletId: Wallet['id']) {
    return wallets?.find((wallet) => wallet.id === walletId);
  }
}
