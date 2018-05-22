import React from 'react';
import { Head, withRouteData } from 'react-static';

import './style.css';
import { toRGBString } from '../../util/helpers';
import Post from '../../components/Post';
import Paginator from '../../components/Paginator';

const TagPage = ({ tag, posts, themePrimaryColor, paginator }) => {
  const themeCss = `
    .g-accent {
      color: ${toRGBString(themePrimaryColor)});
    }
    .paginator .g-button:hover {
      background-color: ${toRGBString(themePrimaryColor)};
    }
  `;

  return (
    <div id="tag">
      <Head>
        <style>{themeCss}</style>
        <title>{`Jewish Currents | ${tag.title}`}</title>
      </Head>
      <div className="tag-info">
        <div className="g-content-wrap">
          <h1>{tag.title}</h1>
        </div>
      </div>
      <div className="tag-content g-content-wrap">
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
        {paginator.totalPages > 1 && <Paginator paginator={paginator} model={tag} />}
      </div>
    </div>
  );
};

export default withRouteData(TagPage);
