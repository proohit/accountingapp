import * as React from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';

const ProtectedRoute: React.FunctionComponent<RouteProps> = (props) => {
  const authentication = useAuthentication();
  const location = useLocation();
  return (
    <Route {...props}>
      {authentication.authenticated ? (
        props.children
      ) : (
        <Redirect to={{ pathname: '/login', state: { referrer: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
