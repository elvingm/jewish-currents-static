import React from 'react';
import { Link } from 'react-static';
//
import './style.css';
import arrowIcon from '../../assets/img/icons/arrow.svg';

export default () => (
  <section className="more-articles-link">
    <h2>
      <Link to="/category/articles">
        <span>More Articles</span>
        <img className="g-arrow" src={arrowIcon} alt="Go To Arrow" />
      </Link>
    </h2>
  </section>
);
