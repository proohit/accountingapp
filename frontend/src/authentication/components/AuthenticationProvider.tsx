import React, { FunctionComponent, useEffect, useState } from 'react';
import { User } from '../../users/models/User';
import USER_API_SERVICE from '../../users/services/UserApiService';
import { AuthenticationContext } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';

export const AuthenticationProvider: FunctionComponent = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const login = (loggedInUsername: string) => {
    setUsername(loggedInUsername);
    setAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    setUsername('');
    setAuthenticated(false);
    setIsLoading(false);
    await AUTHENTICATION_API.logout();
  };

  const loginFromLocalStorage = async () => {
    setIsLoading(true);

    let currentUser: User;

    try {
      currentUser = await USER_API_SERVICE.getCurrentUser();
    } catch (e) {
      await logout();
      return;
    }

    if (!currentUser) {
      await logout();
      return;
    }

    login(currentUser.username);
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        login,
        logout,
        username,
        isLoginLoading: isLoading,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
