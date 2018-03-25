import React from 'react';
import { Link } from 'react-static';
//
import './index.css';

export default props => {
  return (
    <div className="featured-post">
      <div className="image">
        <img src="http://placehold.it/770x488" />
      </div>
      <div className="details">
        <h2 dangerouslySetInnerHTML={{ __html: props.titile }} />
        <div className="excerpt" dangerouslySetInnerHTML={{ __html: props.excerpt }} />
      </div>
    </div>
  );
};
