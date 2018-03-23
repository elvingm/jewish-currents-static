import React from 'react';
import { withRouteData } from 'react-static';
//

export default withRouteData(({ post }) => (
  <div>
    <br />
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </div>
));
