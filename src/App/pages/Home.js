import React from 'react';
import { withRouteData } from 'react-static';
//
import FeaturedPost from '../components/FeaturedPost';

export default withRouteData(({ posts }) => (
  <div>
    <section>
      <FeaturedPost {...posts[0]} />
    </section>
    <section className="articles">
      {posts.map(p => (
        <div className="post" key={p.id}>
          <h1 dangerouslySetInnerHTML={{ __html: p.title }} />
        </div>
      ))}
    </section>
  </div>
));
