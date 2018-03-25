import React from 'react';
//
import './style.css';

export default () => (
  <section className="newsletter-signup">
    <h2>Sign up for our mailing list</h2>
    <form id="newsletter" className="g-border-wrap">
      <input id="email" type="email" placeholder="Email" />
      <input type="submit" value="Submit" className="g-button-filled" />
    </form>
  </section>
);
