import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import Post from '../../components/Post';
import arrowIcon from '../../assets/img/icons/arrow.svg';
import './index.css';

export default withRouteData(({ posts }) => (
  <div id="home">
    <section className="featured-post">
      <Post {...posts[0]} />
    </section>
    <section className="post-row">
      {posts.slice(1, 4).map(p => <Post {...p} stackedLayout />)}
    </section>
    <section className="shop-now-banner">
      <div className="g-border-wrap">
        <img src="http://placehold.it/1360x400" alt="Shop Now" />
      </div>
      <div className="issue-details">
        <h2>Spring 2018 Issue</h2>
        <a className="g-underline-link" href="#">
          Shop Now
        </a>
      </div>
    </section>
    <section className="newsletter">
      <div className="text">
        <h2>Subscribe</h2>
        <h4>New subscribers SAVE $12 off the annual subscription price and get a FREE book!</h4>
        <a className="g-button" href="#">
          Subscribe Now!
        </a>
      </div>
    </section>
    <section className="post-row split">
      {posts.slice(4, 6).map(p => <Post {...p} stackedLayout />)}
    </section>
    <section className="more-articles">
      <h2>
        <Link to="/category/articles">
          <span>More Articles</span>
          <img className="g-arrow" src={arrowIcon} alt="Go To Arrow" />
        </Link>
      </h2>
    </section>
  </div>
));
