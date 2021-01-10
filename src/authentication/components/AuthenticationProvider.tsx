import React, { FunctionComponent, useEffect, useState } from 'react';
import { User } from '../../users/models/User';
import USER_API_SERVICE from '../../users/services/UserApiService';
import { AuthenticationContext } from '../hooks/useAuthentication';

export const AuthenticationProvider: FunctionComponent = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const STORAGE_TOKEN = 'token';

  const login = (loggedInUsername: string, newToken: string) => {
    setUsername(loggedInUsername);
    setAuthenticated(true);
    setToken(newToken);
    localStorage.setItem(STORAGE_TOKEN, newToken);
    setIsLoading(false);
  };

  const logout = () => {
    setUsername('');
    setAuthenticated(false);
    setToken('');
    localStorage.removeItem(STORAGE_TOKEN);
    setIsLoading(false);
  };

  const loginFromLocalStorage = async () => {
    setIsLoading(true);
    const tokenFromStorage = localStorage.getItem(STORAGE_TOKEN);
    if (!tokenFromStorage) {
      logout();
      return;
    }

    let currentUser: User;

    try {
      currentUser = await USER_API_SERVICE.getCurrentUser(tokenFromStorage);
    } catch (e) {
      logout();
      return;
    }

    if (!currentUser) {
      logout();
      return;
    }

    login(currentUser.username, tokenFromStorage);
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        login,
        logout,
        username,
        token,
        isLoginLoading: isLoading,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
