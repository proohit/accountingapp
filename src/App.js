import React, { Component } from 'react';
import { Snackbar, CircularProgress, Grid, Backdrop, Container } from '@material-ui/core'
import './App.css';
import Login from './components/Login'
import NavBar from './components/NavBar'
import Test2 from './components/Test2'



class App extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      alert: null,
      openAlert: false,
      header: 'Dashboard',
      content: null,
      isLoading: false
    }
    this.functionSet = {
      changeHeader: (header) => {
        this.setState({ header: header })
      },
      openAlert: (alert) => {
        this.setState({ alert: alert, openAlert: true })
      },
      closeAlert: () => {
        this.setState({ alert: null, openAlert: false })
      },
      setContent: (content) => {
        this.setState({ content: content })
      },
      toggleLoading: () => {
        this.setState({ isLoading: !this.state.isLoading })
      }
    }
  }

  changeToken = (token) => {
    if (!token || !token === null) {
      localStorage.removeItem('token');
      this.setState({ token: null })
    }
    else {
      localStorage.setItem('token', token);
      this.setState({ token: localStorage.getItem('token') })
    }
  }

  render() {
    let loadingIndicator = null;
    if (this.state.isLoading) {
      loadingIndicator =
        <Backdrop open={this.state.isLoading}>
          <CircularProgress />
        </Backdrop>
    }
    return (
      <div>
        <nav>
          <NavBar functionSet={this.functionSet} changeToken={this.changeToken} token={this.state.token} header={this.state.header}></NavBar>
        </nav>
        <Container>
          <Grid container direction='column' justify='center' alignItems='center'>
            {loadingIndicator}
            {this.state.content}
          </Grid>
        </Container>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={4000}
          open={this.state.openAlert}
          onClose={this.functionSet.closeAlert}>
          {this.state.alert}
        </Snackbar>
      </div>
    );
  }
}

export default App;
