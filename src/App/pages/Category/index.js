import React from 'react';
import { withRouteData } from 'react-static';
import './style.css';
import Post from '../../components/Post';

export default withRouteData(({ category, posts }) => (
  <div id="category">
    <div className="category-info">
      <h1>{category.name}</h1>
    </div>
    <div className="posts">
      <ul>{posts.map(p => <Post key={p.id} {...p} />)}</ul>
    </div>
    <aside className="sidebar">
      <div className="ad-placement_350x600 g-border-wrap">
        <h3>Ad</h3>
      </div>
    </aside>
  </div>
));
