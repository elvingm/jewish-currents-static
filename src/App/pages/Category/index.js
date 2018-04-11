import React from 'react';
import { Head, withRouteData } from 'react-static';

import './style.css';
import { toRGBString } from '../../util/helpers';
import Post from '../../components/Post';

const CategoryPage = ({ category, posts, themePrimaryColor }) => {
  const themeCss = `
    .g-accent {
      color: ${toRGBString(themePrimaryColor)});
    }
  `;

  return (
    <div id="category">
      <Head>
        <style>{themeCss}</style>
      </Head>
      <div className="category-info">
        <div className="g-content-wrap">
          <h1>{category.title}</h1>
        </div>
      </div>
      <div className="category-content g-content-wrap">
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
  );
};

export default withRouteData(CategoryPage);
