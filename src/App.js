import { CircularProgress, Grid, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';



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
      toggleLoading: (loading) => {
        if (loading === null || loading === undefined || typeof loading !== 'boolean') {
          this.setState({ isLoading: !this.state.isLoading })
        }
        else {
          this.setState({ isLoading: loading })
        }
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
      loadingIndicator = <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />
    }
    return (
      <div>
        <nav>
          <NavBar functionSet={this.functionSet} changeToken={this.changeToken} token={this.state.token} header={this.state.header}></NavBar>
        </nav>
        <Grid container direction='column' justify='center' alignItems='center'>
          {this.state.content}
        </Grid>
        {loadingIndicator}
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
