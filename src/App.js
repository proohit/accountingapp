import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Snackbar } from '@material-ui/core'
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
      }
    }
  }

  changeToken = (token) => {
    localStorage.setItem('token', token);
    this.setState({ token: localStorage.getItem('token') })
  }
  render() {
    let loginRoute = { link: null, route: null };
    if (!this.state.token) {
      loginRoute = {
        link: <li>
          <Link to="/login">login</Link>
        </li>,
        route: <Route path="/login">
          <Login functionSet={this.functionSet} changeToken={this.changeToken} />
        </Route>
      };
    }
    return (
      <Router>
        <div>
          <nav>
            <NavBar token={this.state.token} header={this.state.header}></NavBar>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {loginRoute.link}
              <li>
                <Link to="/test2">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            {loginRoute.route}
            <Route path="/test2">
              <Test2 />
            </Route>
          </Switch>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={4000}
            open={this.state.openAlert}
            onClose={this.functionSet.closeAlert}>
            {this.state.alert}
          </Snackbar>
        </div>
      </Router >

    );
  }
}

export default App;
