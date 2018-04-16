import React from 'react';
//
import './style.css';

const SubscribeCallout = () => (
  <section className="subscribe-callout">
    <div className="text">
      <h2>Keep it current! ---> Subscribe!</h2>
      <h4>Subscribe to Jewish Currents and get four print issues a year for $18.</h4>
      <a
        className="g-button"
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W8ATPREV8BDC4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe Now!
      </a>
    </div>
  </section>
);

export default SubscribeCallout;
