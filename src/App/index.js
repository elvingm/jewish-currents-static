import React from 'react';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
//
import Routes from 'react-static-routes';
import ReactGA from 'react-ga';
import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

function fireTracking() {
  ReactGA.pageview(window.location.hash);
}

class App extends React.Component {
  constructor() {
    super();

    if (typeof window !== 'undefined') {
      ReactGA.initialize('UA-35060516-1');
      ReactGA.pageview(window.location.pathname);
    }
  }

  render() {
    return (
      <Router onUpdate={fireTracking}>
        <div>
          <Header />
          <div className="content">
            <Routes />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
