import React from 'react';
import { Router, Link } from 'react-static';
import { hot } from 'react-hot-loader';
//
import Routes from 'react-static-routes';
import logoImg from '../img/logo.svg';
import './index.css';

const App = () => (
  <Router>
    <div>
      <header>
        <div className="logo">
          <img src={logoImg} alt="Jewish Currents " />
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </header>
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(App);
