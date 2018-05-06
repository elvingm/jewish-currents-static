import React from 'react';
import { withRouteData } from 'react-static';
import './style.css';
import Post from '../../components/Post';

const AuthorPage = ({ author, posts }) => (
  <div id="author">
    <div className="author-info">
      <div className="g-content-wrap">
        <h1>{author.name}</h1>
        <div className="description" dangerouslySetInnerHTML={{ __html: author.description }} />
      </div>
    </div>
    <div className="author-content g-content-wrap">
      <ul className="posts">
        {posts &&
          posts.map(p => (
            <li key={p.id}>
              <Post {...p} />
            </li>
          ))}
      </ul>
      <aside className="sidebar">
        {/* <div className="g-ad_350x600 g-border-wrap">
          <h3>Ad</h3>
        </div> */}
      </aside>
    </div>
  </div>
);

export default withRouteData(AuthorPage);
