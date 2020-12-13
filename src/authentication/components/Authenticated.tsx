import { Backdrop, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import React, { Fragment, useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

interface IAuthenticatedProps {}

const Authenticated: React.FunctionComponent<IAuthenticatedProps> = (props) => {
  const router = useRouter();

  const { authenticated, isLoginLoading } = useAuthentication();

  const isCalledLoginNecessary = () => {
    return router.route === '/login' && authenticated;
  };
  const needsLogin = () => {
    return !authenticated && !isLoginLoading && router.route !== '/login';
  };

  useEffect(() => {
    if (isCalledLoginNecessary()) {
      router.push('/');
    }

    if (needsLogin()) {
      router.push('/login');
    }
  }, [router.route, authenticated, isLoginLoading]);

  return (
    <Fragment>
      {isLoginLoading ? (
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
