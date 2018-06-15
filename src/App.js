import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {
  Layout,
} from 'antd';
import { RandomBeer, Beer, Brewery } from './beer';
import beerIcon from './beer-icon.png';

import './App.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout>
      <Header className="App-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="App-logo">
          <img src={beerIcon} alt="Random beer" />
        </div>
        <h1 className="App-title">The Random Beer App</h1>
        <Link to="/" className="App-another ant-btn ant-btn-primary">Show another beer</Link>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 104 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Route exact path="/" component={RandomBeer} />
          <Route path="/beer/:id" component={Beer} />
          <Route path="/brewery/:id" component={Brewery} />
          <Route path="/error" component={() => (<h1>Something went wrong</h1>)} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Random Beer App ©2018 Created by Rob Masters
      </Footer>
    </Layout>
  </ConnectedRouter>
);

export default App;
