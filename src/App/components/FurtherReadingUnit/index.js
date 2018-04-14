import React from 'react';
import { withRouteData } from 'react-static';
//
import './style.css';
import PostListCondensed from '../PostListCondensed';

const FurtherReading = ({ posts }) => (
  <div className="further-reading">
    <h2 className="g-accent">Further Reading</h2>
    <PostListCondensed posts={posts} />
  </div>
);

export default withRouteData(FurtherReading);
