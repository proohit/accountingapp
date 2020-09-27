import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../../authentication/pages/LoginPage';
import ProtectedRoute from '../../records/pages/ProtectedRoute';
import RecordPage from '../../records/pages/RecordPage';

export const ApplicationRouter: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route path="/login">
            <LoginPage />
          </Route>
          <ProtectedRoute path="/records">
            <RecordPage />
          </ProtectedRoute>
          <ProtectedRoute path="/wallets"></ProtectedRoute>
        </>
      </Switch>
    </BrowserRouter>
  );
};
