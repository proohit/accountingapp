import { Wallet } from './Wallet';

export interface WalletContextModel {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  getWallets(): void;
}
