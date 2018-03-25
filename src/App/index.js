import React from 'react';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
//
import Routes from 'react-static-routes';
import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="content">
        <Routes />
      </div>
      <Footer />
    </div>
  </Router>
);

export default hot(module)(App);
