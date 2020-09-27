import React from 'react';
import { Grid } from '@material-ui/core';
import LoginForm from '../components/LoginForm';
import { useLocation, Redirect } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

const LoginPage: React.FunctionComponent = (props) => {
  const location = useLocation<{ referrer: 'string' }>();
  const authentication = useAuthentication();
  const referrer = location.state && location.state.referrer;
  return authentication.authenticated && referrer ? (
    <Redirect to={location.state.referrer} />
  ) : (
    <Grid container direction="row" justify="center">
      <LoginForm />
    </Grid>
  );
};

export default LoginPage;
