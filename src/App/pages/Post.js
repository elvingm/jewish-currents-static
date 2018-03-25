import React from 'react';
import { withRouteData } from 'react-static';
//

export default withRouteData(({ post }) => (
  <div>
    <br />
    <h1>{post.title}</h1>
  </div>
));
