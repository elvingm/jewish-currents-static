import React from 'react';
import { Link, withRouteData, scrollTo } from 'react-static';
//
import './style.css';

const handleSubscribeClick = event => {
  if (typeof document !== 'undefined') {
    event.preventDefault();
    const element = document.querySelector(event.target.hash);
    scrollTo(element, { duration: 500 });
  }
};

const SubscribeCallout = ({ currentPage }) => (
  <section className="subscribe-callout">
    <div className="text">
      <h2>Keep it current! ---> Subscribe!</h2>
      <h4>Subscribe to Jewish Currents and get four print issues a year for $18.</h4>
      {currentPage === 'home' ? (
        <a className="g-button" href="#shop-now-ad" onClick={handleSubscribeClick}>
          Subscribe Now!
        </a>
      ) : (
        <Link to="/#shop-now-ad" className="g-button">
          Subscribe Now!
        </Link>
      )}
    </div>
  </section>
);

export default withRouteData(SubscribeCallout);
