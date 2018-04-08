import React from 'react';
import { withRouteData } from 'react-static';
import './style.css';
import Post from '../../components/Post';

export default withRouteData(({ author, posts }) => (
  <div id="author">
    <div className="author-info">
      <div className="g-content-wrap">
        <h1>{author.name}</h1>
      </div>
    </div>
    <div className="author-content g-content-wrap">
      <ul className="posts">
        {posts.map(p => (
          <li key={p.id}>
            <Post {...p} />
          </li>
        ))}
      </ul>
      <aside className="sidebar">
        <div className="g-ad_350x600 g-border-wrap">
          <h3>Ad</h3>
        </div>
      </aside>
    </div>
  </div>
));
