import { UserDto } from '@accountingapp/shared';
import { useRouter } from 'next/dist/client/router';
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../shared/hooks/notificationState';
import { AuthenticationContext } from '../hooks/useAuthentication';
import { AUTHENTICATION_API } from '../services/AuthenticationApi';
import { isAuthenticationRoute } from '../services/RoutingService';

export const AuthenticationProvider: FunctionComponent<PropsWithChildren> = (
  props
) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const setNotification = useSetRecoilState(notificationState);
  const router = useRouter();

  const login = async (usernameForLogin: string, password: string) => {
    setIsLoading(true);
    try {
      await AUTHENTICATION_API.login(usernameForLogin, password);
      const loggedInUser = await AUTHENTICATION_API.getCurrentUser();
      setNotification({
        severity: 'success',
        content: 'Login successful',
      });
      setUsername(loggedInUser.username);
      setUser(loggedInUser);
      setAuthenticated(true);
      return loggedInUser;
    } catch (err) {
      handleAuthenticationError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const offlineLogin = (loggedInUser: UserDto) => {
    setUsername(loggedInUser.username);
    setUser(loggedInUser);
    setAuthenticated(true);
    setIsLoading(false);
  };

  const logout = async () => {
    try {
      setUsername('');
      setUser(null);
      setAuthenticated(false);
      setIsLoading(false);
      await AUTHENTICATION_API.logout();
    } catch (e) {
      handleAuthenticationError(e);
    }
  };

  const handleAuthenticationError = (err: any) => {
    const error: Error = err;
    setNotification({ severity: 'error', content: error.message });
  };

  const loginFromLocalStorage = async () => {
    setIsLoading(true);

    let currentUser: UserDto;

    try {
      currentUser = await AUTHENTICATION_API.getCurrentUser();
    } catch (e) {
      if (!isAuthenticationRoute(router.route)) {
        handleAuthenticationError(e);
      }
    }

    if (!currentUser) {
      await logout();
      setIsLoading(false);
      return;
    }

    offlineLogin(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    loginFromLocalStorage();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        login,
        user,
        offlineLogin,
        logout,
        username,
        isLoginLoading: isLoading,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
