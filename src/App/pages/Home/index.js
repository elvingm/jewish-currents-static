import React from 'react';
import { withRouteData } from 'react-static';
//
import Post from '../../components/Post';
import Newsletter from '../../components/Newsletter';
import SubscribePopup from '../../components/SubscribePopup';
import SubscribeCallout from '../../components/SubscribeCallout';
import Image from '../../components/Image';
import './style.css';

const HomePage = ({
  mainFeaturedPost,
  featuredPostColumns,
  featuredPostPaired,
  currentIssueImage
}) => (
  <div id="home">
    <div className="g-content-wrap">
      <section className="featured-post">
        <Post {...mainFeaturedPost} />
      </section>
      <section className="post-row split-30">
        {featuredPostColumns.map(p => <Post {...p} key={p.id} stackedLayout />)}
      </section>
      <section className="shop-now-ad">
        <div className="g-border-wrap">
          <div className="image-wrap">
            <Image src={currentIssueImage.path} alt={currentIssueImage.alt} />
          </div>
          <div className="issue-details">
            <h2>Spring 2018 Issue</h2>
            <a className="g-underline-link" href="#">
              Shop Now
            </a>
          </div>
        </div>
      </section>
      <SubscribeCallout />
      <section className="post-row split-40x60">
        {featuredPostPaired.map(p => <Post {...p} key={p.id} stackedLayout />)}
      </section>
      <Newsletter />
    </div>
    <SubscribePopup wait={2500} />
  </div>
);

export default withRouteData(HomePage);
