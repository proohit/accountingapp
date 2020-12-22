import React, { useContext } from 'react';
import { WalletContextModel } from '../models/WalletContextModel';

export const WalletsContext = React.createContext<WalletContextModel>(
  {} as WalletContextModel
);

export const useWallets = () => {
  const context = useContext(WalletsContext);

  if (!context) {
    throw new Error('Wallet Context not provided');
  }

  return context;
};
