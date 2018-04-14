import React from 'react';
import { Link } from 'react-static';
import { isArray } from 'lodash';
//
import { MONTH_NAMES } from '../../util/constants';
import './style.css';

const PostListCondensed = props => (
  <ul className="g-post-list-condensed">
    {props.posts.map(post => {
      const date = new Date(post.publishedAt);
      const category = isArray(post.categories) ? post.categories[0] : post.categories;

      return (
        <li className="g-post-condensed" key={post.id}>
          <h2 className="title">
            <Link to={`/${category.slug}/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="info">
            <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
          </p>
        </li>
      );
    })}
  </ul>
);

export default PostListCondensed;
