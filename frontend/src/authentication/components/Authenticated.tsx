import { Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { isAuthenticationRoute } from '../services/RoutingService';

interface IAuthenticatedProps {}
const historyStack = [];

const Authenticated: React.FunctionComponent<IAuthenticatedProps> = (props) => {
  const router = useRouter();
  const { authenticated, isLoginLoading } = useAuthentication();

  const needsLogin = () => {
    return (
      !authenticated && !isLoginLoading && !isAuthenticationRoute(router.route)
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
    if (isLoggedInAndAccessAuthentication()) {
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
