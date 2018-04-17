import React from 'react';
import { withRouteData } from 'react-static';
//
import Post from '../../components/Post';
import NewsletterForm from '../../components/NewsletterForm';
import NewsletterPopup from '../../components/NewsletterPopup';
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
        <Post {...mainFeaturedPost} useThumbnail />
      </section>
      <section className="post-row split-30">
        {featuredPostColumns.map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
      </section>
      <section id="shop-now-ad">
        <div className="g-border-wrap">
          <div className="image-wrap">
            {currentIssueImage && (
              <Image
                src={currentIssueImage.path}
                alt={currentIssueImage.alt}
                fmt={currentIssueImage.format}
              />
            )}
          </div>
          <div className="issue-details">
            <h2>
              One Year of <br />
              <em>Jewish Currents</em>
            </h2>
            <a
              className="g-underline-link"
              href="https://www.paypal.com/webapps/hermes?token=9C343602L9292974Y&useraction=commit&rm=1&mfid=1523898170030_8e4a011c8a5d1"
              target="_blank"
              rel="noopener noreferrer"
            >
              US: $18
            </a>
            <a
              className="g-underline-link"
              href="https://www.paypal.com/webapps/hermes?token=94N68153JG388735J&useraction=commit&rm=1&mfid=1523898174086_af976cc85b63"
              target="_blank"
              rel="noopener noreferrer"
            >
              International: $40
            </a>
            <a
              className="g-underline-link"
              href="https://www.paypal.com/webapps/hermes?token=0X363501YP711713G&useraction=commit&mfid=1523898171684_bf2549893656a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gift Subscriptions
            </a>
          </div>
        </div>
      </section>
      <SubscribeCallout />
      <section className="post-row split-40x60">
        {featuredPostPaired.map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
      </section>
      <section className="newsletter-signup">
        <NewsletterForm formId="a3ab65eb-bed1-456e-a221-7310a4bf4d7e" />
      </section>
    </div>
    <NewsletterPopup wait={5000} />
  </div>
);

export default withRouteData(HomePage);
