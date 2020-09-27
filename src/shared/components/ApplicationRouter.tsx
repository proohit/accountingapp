import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../../authentication/pages/LoginPage';

export const ApplicationRouter: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/records"></Route>
        <Route path="/wallets"></Route>
      </Switch>
    </BrowserRouter>
  );
};
