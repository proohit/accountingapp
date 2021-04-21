import React, { useContext } from 'react';
import { Authentication } from '../models/Authentication';

export const AuthenticationContext = React.createContext<Authentication>(
  {} as Authentication
);

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error('Authentication Context not provided');
  }

  return context;
};
