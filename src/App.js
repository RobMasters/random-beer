import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { RandomBeer } from './beer';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">The Random Beer App</h1>
      </header>

      <Route exact path="/" component={RandomBeer} />

    </div>
  </ConnectedRouter>
);

export default App;
