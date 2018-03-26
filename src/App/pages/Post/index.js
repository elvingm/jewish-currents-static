import React from 'react';
import { withRouteData } from 'react-static';
//
import './style.css';
import { MONTH_NAMES } from '../../util/date';

export default withRouteData(({ post }) => {
  const date = new Date(post.date);
  return (
    <div id="post">
      <div className="featured-image g-border-wrap">
        <img src="http://placehold.it/1450x730" alt="Post Feature" />
      </div>
      <section className="post-content-area">
        <article>
          <header>
            <h3 className="label">Featured Article</h3>
            <h1 className="g-accent" dangerouslySetInnerHTML={{ __html: post.title }} />
            <p>
              <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
              <a className="author g-underline-link" href="#">
                Author Name
              </a>
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <aside>
          <div className="ad-placement_350x600 g-border-wrap">
            <h3>Ad</h3>
          </div>
          <div className="related-posts">
            <h2 className="g-accent">Further Reading</h2>
          </div>
        </aside>
      </section>
    </div>
  );
});
