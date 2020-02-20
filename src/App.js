import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Test2 from './components/Test2'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/test2">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
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
