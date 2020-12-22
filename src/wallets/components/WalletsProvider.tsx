import React, { FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { WalletsContext } from '../hooks/useWallets';
import { Wallet } from '../models/Wallet';
import { WalletsApiService } from '../services/WalletsApi';

export const WalletsProvider: FunctionComponent = (props) => {
  const [wallets, setWallets] = useState<Wallet[]>(null);
  const authentication = useAuthentication();
  const walletsApi = new WalletsApiService();

  const getWallets = async () => {
    const newWallets = await walletsApi.getWalletsByUser(authentication.token);
    setWallets(newWallets);
  };

  return (
    <WalletsContext.Provider
      value={{
        wallets,
        setWallets,
        getWallets,
      }}
    >
      {props.children}
    </WalletsContext.Provider>
  );
};
