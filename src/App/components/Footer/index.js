import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';
import { toRGBString } from '../../util/helpers';

export default withRouteData(({ footerColor }) => {
  // default background color to white if none provided to route
  footerColor = footerColor || { red: 255, green: 255, blue: 255 };
  return (
    <footer id="site-footer" style={{ backgroundColor: toRGBString(footerColor) }}>
      <ul>
        <li>Jewish Currents</li>
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
  );
});
