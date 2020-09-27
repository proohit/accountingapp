import React from 'react';
import { Grid } from '@material-ui/core';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {}

const App: React.FunctionComponent<LoginPageProps> = (props) => {
  return (
    <Grid container direction="row" justify="center">
      <LoginForm />
    </Grid>
  );
};

export default App;
