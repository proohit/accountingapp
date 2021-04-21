import { atom } from 'recoil';
import { WalletDialogs } from '../models/WalletDialogs';

export const editWalletDialogState = atom<WalletDialogs['editWallet']>({
  key: 'editWalletDialog',
  default: { open: false, walletToEdit: null },
});

export const addWalletDialogState = atom<WalletDialogs['addWallet']>({
  key: 'addWalletDialog',
  default: { open: false },
});
