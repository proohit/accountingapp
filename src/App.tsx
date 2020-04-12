import { Snackbar } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './navigation/components/NavBar';
import RecordView from './records/components/RecordView';
import { Alert } from './shared/alert/AlertModel';
import { DataComponentProps } from './shared/BaseProps';
import WalletView from './wallets/components/WalletView';
import { TypedAlert } from './shared/alert/TypedAlert';
import AuthenticationProvider from './shared/context/AuthenticationProvider'
import Login from './authentication/components/Login';

type IState = {
  token: string | null;
  alert: Alert | null;
  openAlert: boolean,
  header: string,
  isLoading: boolean
}

class App extends React.Component<{}, IState> {
  functionSet: DataComponentProps["functionSet"]

  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      alert: null,
      openAlert: false,
      header: 'Dashboard',
      isLoading: false
    }

    this.functionSet = {
      changeHeader: (header: string) => {
        this.setState({ header: header })
      },
      openAlert: (alert: Alert) => {
        this.setState({ alert: alert, openAlert: true })
      },
      toggleLoading: (loading: boolean) => {
        this.setState({ isLoading: loading })
      }
    }
  }

  closeAlert = () => {
    this.setState({ openAlert: false })
  }

  render() {
    console.log('renders App');
    return (
      <AuthenticationProvider>
        <BrowserRouter>
          <nav>
            <div data-testid="navbar">
              <NavBar title={this.state.header} functionSet={this.functionSet}></NavBar>
            </div>
          </nav>

          <Switch>
            <Route path="/login">
              <Login functionSet={this.functionSet} />
            </Route>
            <Route path="/records">
              <RecordView functionSet={this.functionSet} />
            </Route>
            <Route path="/wallets">
              <WalletView functionSet={this.functionSet} />
            </Route>

          </Switch>
        </BrowserRouter>
        <Snackbar
          data-testid="snackbar"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={4000}
          onClose={this.closeAlert}
          open={this.state.openAlert}>
          {this.state.alert ? <TypedAlert alert={this.state.alert} /> : null}
        </Snackbar>
      </AuthenticationProvider>

    );
  }
}

export default App;
