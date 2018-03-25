import React from 'react';
import { Link } from 'react-static';
//
import { MONTH_NAMES } from '../../util/date';
import './index.css';

export default props => {
  const date = new Date(props.date);
  return (
    <div className="featured-post">
      <div className="image">
        <img src="http://placehold.it/770x488" alt="Featured" />
      </div>
      <div className="details">
        <h3 className="label">Featured Article</h3>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: props.title }} />
        <p>
          <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
          <span className="author">Author Name</span>
        </p>
        <div className="excerpt" dangerouslySetInnerHTML={{ __html: props.excerpt }} />
        <Link to={`/${props.slug}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};
