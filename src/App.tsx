import { Snackbar, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './navigation/components/NavBar';
import RecordView from './records/components/RecordView';
import { Alert } from './shared/alert/AlertModel';
import { DataComponentProps } from './shared/BaseProps';
import WalletView from './wallets/components/WalletView';
import { TypedAlert } from './shared/alert/TypedAlert';
import AuthenticationProvider from './shared/context/AuthenticationProvider';
import Login from './authentication/components/Login';
import Dashboard from './dashboard/components/Dashboard';

const useAppStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing(4),
  },
}));

const App: React.FunctionComponent<{}> = (props) => {
  const [alert, setAlert] = useState<Alert | null>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [header, setHeader] = useState<string>('Dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useAppStyles();

  const functionSet: DataComponentProps['functionSet'] = {
    changeHeader: (header: string) => setHeader(header),
    openAlert: (alert: Alert) => {
      setAlert(alert);
      setOpenAlert(true);
    },
    toggleLoading: (loading: boolean) => setIsLoading(loading),
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <nav>
          <div data-testid='navbar'>
            <NavBar title={header} functionSet={functionSet}></NavBar>
          </div>
        </nav>
        <div className={classes.content}>
          <Switch>
            <Route path='/login'>
              <Login functionSet={functionSet} />
            </Route>
            <Route path='/records'>
              <RecordView functionSet={functionSet} />
            </Route>
            <Route path='/wallets'>
              <WalletView functionSet={functionSet} />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      {isLoading && undefined}
      <Snackbar
        data-testid='snackbar'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={closeAlert}
        open={openAlert}
      >
        {alert ? <TypedAlert alert={alert} /> : null}
      </Snackbar>
    </AuthenticationProvider>
  );
};

export default App;
