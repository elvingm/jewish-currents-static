import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';

export default withRouteData(({ currentPage }) => (
  <footer id="site-footer" className={`accent-${currentPage}`}>
    <ul>
      <li>Jewish Currents</li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/about">Contact Us</Link>
      </li>
      <li>
        <Link>Join Our Mailing List</Link>
      </li>
      <li>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </li>
    </ul>
  </footer>
));
