import React from 'react';
import { withRouteData } from 'react-static';
//

export default withRouteData(({ posts }) => (
  <div>
    {posts.map(p => (
      <div className="featured-post" key={p.id}>
        <h1 dangerouslySetInnerHTML={{ __html: p.title }} />
      </div>
    ))}
  </div>
));
