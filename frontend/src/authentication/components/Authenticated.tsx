import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, PropsWithChildren, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { registerGreetingState } from '../hooks/registerGreetingState';
import { useAuthentication } from '../hooks/useAuthentication';
import {
  isAuthenticationRoute,
  isOfflineRoute,
} from '../services/RoutingService';

const Authenticated: React.FunctionComponent<PropsWithChildren> = (props) => {
  const router = useRouter();
  const { authenticated, isLoginLoading } = useAuthentication();
  const registerGreeting = useRecoilValue(registerGreetingState);
  const needsLogin = () => {
    return (
      !authenticated &&
      !isLoginLoading &&
      !isAuthenticationRoute(router.route) &&
      !isOfflineRoute(router.route)
    );
  };

  const isLoggedInAndAccessAuthentication = () => {
    return (
      authenticated && !isLoginLoading && isAuthenticationRoute(router.route)
    );
  };

  const shouldDisplayGlobalLoading = () => {
    return (
      isLoginLoading && !authenticated && !isAuthenticationRoute(router.route)
    );
  };

  useEffect(() => {
    if (isLoggedInAndAccessAuthentication() && !registerGreeting) {
      router.push('/home');
      return;
    }
    if (needsLogin()) {
      router.push('/login');
    }
  }, [router.route, authenticated, isLoginLoading]);

  return (
    <Fragment>
      {shouldDisplayGlobalLoading() ? (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      ) : (
        props.children
      )}
    </Fragment>
  );
};

export default Authenticated;
