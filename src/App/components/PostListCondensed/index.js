import React from 'react';
import { Link } from 'react-static';
//
import { MONTH_NAMES } from '../../util/constants';
import './style.css';

export default props => (
  <ul className="g-post-list">
    {props.posts.map(p => {
      const date = new Date();
      const title = p.title || 'Woody Allen Deserves Whatever is coming.';
      return (
        <li>
          <h3 className="title">
            <Link to="#" dangerouslySetInnerHTML={{ __html: title }} />
          </h3>
          <p>
            <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
            <a className="author g-underline-link" href="#">
              Author Name
            </a>
          </p>
        </li>
      );
    })}
  </ul>
);
