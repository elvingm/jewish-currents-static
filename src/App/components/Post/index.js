import React from 'react';
import { Link } from 'react-static';
import classNames from 'classnames';
//
import { MONTH_NAMES } from '../../util/date';
import './style.css';

export default props => {
  const date = new Date(props.date);
  return (
    <div className={classNames({ 'g-post': true, stacked: props.stackedLayout })}>
      <div className="image g-border-wrap">
        <img src={props.featuredMedia.source_url} alt={props.featuredMedia.alt_text} />
      </div>
      <div className="details">
        <h3 className="label g-accent">Featured Article</h3>
        <h2 className="title" dangerouslySetInnerHTML={{ __html: props.title }} />
        <p>
          <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
          <Link className="author g-underline-link" to={`/author/${props.author.slug}`}>
            {props.author.name}
          </Link>
        </p>
        <div className="excerpt" dangerouslySetInnerHTML={{ __html: props.excerpt }} />
        <Link to={`/${props.categories[0].slug}/${props.slug}`} className="g-bold-link">
          Read More
        </Link>
      </div>
    </div>
  );
};
