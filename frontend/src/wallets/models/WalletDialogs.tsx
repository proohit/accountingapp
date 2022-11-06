import { WalletDto } from '@accountingapp/shared';

export type WalletDialogs = {
  editWallet: {
    open: boolean;
    walletToEdit: WalletDto;
  };
  addWallet: {
    open: boolean;
  };
};
