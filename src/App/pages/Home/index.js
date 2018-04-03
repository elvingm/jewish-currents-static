import React from 'react';
import { Head, withRouteData } from 'react-static';
//
import Post from '../../components/Post';
import Newsletter from '../../components/Newsletter';
import SubscribePopup from '../../components/SubscribePopup';
import MoreArticlesLink from '../../components/MoreArticlesLink';
import SubscribeCallout from '../../components/SubscribeCallout';
import Image from '../../components/Image';
import magazinesImg from '../../assets/img/magazines-collection.png';
import './style.css';

export default withRouteData(({ title, description, posts }) => (
  <div id="home">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>

    <div className="g-content-wrap">
      <section className="featured-post">
        <Post {...posts[0]} />
      </section>
      <section className="post-row split-30">
        {posts.slice(1, 4).map(p => <Post {...p} key={p.id} stackedLayout />)}
      </section>
      <section className="shop-now-ad">
        <div className="g-border-wrap">
          <div className="image-wrap">
            <Image src={magazinesImg} />
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
        {posts.slice(4, 6).map(p => <Post {...p} key={p.id} stackedLayout />)}
      </section>
      <MoreArticlesLink />
      <Newsletter />
    </div>
    <SubscribePopup wait={2500} />
  </div>
));
