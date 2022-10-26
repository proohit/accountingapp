import { QueryClient, MutationCache, QueryCache } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { notificationState } from './notificationState';

export const useCustomQueryClient = () => {
  const setNotification = useSetRecoilState(notificationState);
  return new QueryClient({
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        setNotification({
          content: error.message || 'Unexpected error',
          severity: 'error',
        });
        error = null;
      },
    }),
    queryCache: new QueryCache({
      onError: (error: Error) => {
        setNotification({
          content: error.message || 'Unexpected error',
          severity: 'error',
        });
        error = null;
      },
    }),
  });
};
