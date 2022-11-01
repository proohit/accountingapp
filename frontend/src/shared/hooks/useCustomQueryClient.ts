import Router from 'next/router';
import { MutationCache, QueryCache, QueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import {
  isAuthenticationRoute,
  isOfflineRoute,
} from '../../authentication/services/RoutingService';
import { notificationState } from './notificationState';

type ApiError = Error & {
  status?: number;
};

export const useCustomQueryClient = () => {
  const setNotification = useSetRecoilState(notificationState);

  const redirectToLoginIfNeeded = (error: ApiError) => {
    if (
      error.status === 401 &&
      !isAuthenticationRoute(Router.route) &&
      !isOfflineRoute(Router.route)
    ) {
      Router.reload();
    }
  };

  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error: ApiError) => {
        setNotification({
          content: error.message || 'Unexpected error',
          severity: 'error',
        });
        redirectToLoginIfNeeded(error);
        error = null;
      },
    }),
    queryCache: new QueryCache({
      onError: (error: Error) => {
        setNotification({
          content: error.message || 'Unexpected error',
          severity: 'error',
        });
        redirectToLoginIfNeeded(error);
        error = null;
      },
    }),
  });
};
