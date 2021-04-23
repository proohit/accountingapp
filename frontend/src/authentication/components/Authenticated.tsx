import { Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

interface IAuthenticatedProps {}
const historyStack = [];

const Authenticated: React.FunctionComponent<IAuthenticatedProps> = (props) => {
  const router = useRouter();
  const { authenticated, isLoginLoading } = useAuthentication();

  const needsLogin = () => {
    return (
      !authenticated &&
      !isLoginLoading &&
      router.route !== '/login' &&
      router.route !== '/register'
    );
  };

  const isLoggedInAndAccessAuthentication = () => {
    return (
      authenticated &&
      !isLoginLoading &&
      (router.route === '/login' || router.route === '/register')
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
      {isLoginLoading && !authenticated ? (
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
