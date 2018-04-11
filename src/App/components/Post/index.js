import React from 'react';
import { Link } from 'react-static';
import { isArray } from 'lodash';
import classNames from 'classnames';
import striptags from 'striptags';
//
import './style.css';
import { MONTH_NAMES } from '../../util/constants';
import Image from '../Image';

export default props => {
  const date = new Date(props.publishedAt);
  const excerpt = props.excerpt ? props.excerpt : striptags(props.content).slice(0, 400);
  const category = isArray(props.categories) ? props.categories[0] : props.categories;

  return (
    <div className={classNames({ 'g-post': true, stacked: props.stackedLayout })}>
      {props.featuredImage && (
        <div className="image g-border-wrap">
          <Link to={`/${category.slug}/${props.slug}`}>
            <Image src={props.featuredImage.path} alt={props.featuredImage.alt} />
          </Link>
        </div>
      )}
      <div className="details">
        <h3 className="label g-accent">
          <Link to={`/${category.slug}`}>{category.title}</Link>
        </h3>
        <h2 className="title">
          <Link to={`/${category.slug}/${props.slug}`}>{props.title}</Link>
        </h2>
        <p>
          <span className="date">{`${
            MONTH_NAMES[date.getMonth()]
          } ${date.getDate()}, ${date.getYear()}`}</span>
          <Link className="author g-underline-link" to={`/author/${props.authors.slug}`}>
            {props.authors.name}
          </Link>
        </p>
        <p className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
        <Link to={`/${category.slug}/${props.slug}`} className="g-bold-link">
          Read More
        </Link>
      </div>
    </div>
  );
};
