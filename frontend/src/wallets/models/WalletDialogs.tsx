import { Wallet } from './Wallet';

export type WalletDialogs = {
  editWallet: {
    open: boolean;
    walletToEdit: Wallet;
  };
  addWallet: {
    open: boolean;
  };
};
