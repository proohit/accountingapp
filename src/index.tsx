import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactWebComponent from 'react-web-component';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactWebComponent.create(<App/>, 'my-app',false)