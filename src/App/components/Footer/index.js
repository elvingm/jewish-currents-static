import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';
import { toRGBString } from '../../util/helpers';
import LAReviewOfBooksLogo from '../../../../public/img/la-review-of-books.png';

export default withRouteData(({ footerColor }) => {
  // default background color to white if none provided to route
  footerColor = footerColor || { red: 255, green: 255, blue: 255 };
  return (
    <footer id="site-footer" style={{ backgroundColor: toRGBString(footerColor) }}>
      <div className="g-thick-border">
        <ul>
          <li>Jewish Currents</li>
          <li>
            <Link to="/about">Contact Us</Link>
          </li>
          <li>
            <Link to="/about/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
        <p>
          <img
            className="la-review-of-books-logo"
            src={LAReviewOfBooksLogo}
            alt="Los Angeles Review of Books Affiliate Logo"
          />LA Review Of Books Channel
        </p>
      </div>
    </footer>
  );
});
