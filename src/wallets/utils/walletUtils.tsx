import { Wallet } from '../models/Wallet';

export const getWalletByName = (
  wallets: Wallet[],
  walletName: Wallet['name']
) => {
  return wallets?.find((wallet) => wallet.name === walletName);
};
export const getWalletById = (wallets: Wallet[], walletId: Wallet['id']) => {
  return wallets.find((wallet) => wallet.id === walletId);
};
