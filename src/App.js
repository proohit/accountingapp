import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Test2 from './components/Test2'

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
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
          <Login changeToken={this.changeToken} />
        </Route>
      };
    }
    return (
      <Router>
        <div>
          <nav>
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
        </div>
      </Router>
    );
  }
}

export default App;
