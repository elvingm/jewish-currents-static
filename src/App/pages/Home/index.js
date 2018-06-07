import React from 'react';
import { Head, withRouteData } from 'react-static';
import { chunk } from 'lodash';
//
import Post from '../../components/Post';
import NewsletterForm from '../../components/NewsletterForm';
import NewsletterPopup from '../../components/NewsletterPopup';
import Image from '../../components/Image';
import './style.css';
import SubscribeButton from '../../components/SubscribeButton';

const HomePage = ({
  mainFeaturedPost,
  featuredPostColumns,
  featuredPostPaired,
  currentIssueImage,
  pageMeta
}) => {
  const postRowChunks = chunk(featuredPostColumns, 3);
  const shareImageURL = pageMeta.image && `https://www.datocms-assets.com${pageMeta.image.path}`;

  return (
    <div id="home">
      <Head>
        <meta name="description" content={pageMeta.description} />

        {/* Schema.org for Google */}
        <meta item="name" content={pageMeta.title} />
        <meta item="description" content={pageMeta.description} />
        {shareImageURL && <meta item="image" content={shareImageURL} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageMeta.title} />
        <meta name="twitter:description" content={pageMeta.description} />
        {shareImageURL && <meta name="twitter:image:src" content={shareImageURL} />}

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        {shareImageURL && <meta property="og:image" content={shareImageURL} />}
      </Head>
      <div className="g-content-wrap">
        <section className="featured-post">
          <Post {...mainFeaturedPost} useThumbnail />
        </section>
        {postRowChunks[0] && (
          <section className="post-row split-33">
            {postRowChunks[0].map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
          </section>
        )}
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
              <SubscribeButton plan="Domestic" buttonText="Domestic - $18/yr" />
              <SubscribeButton plan="International" buttonText="International - $40/yr" />
              <SubscribeButton plan="Lifetime" buttonText="Lifetime - $300" />
            </div>
          </div>
        </section>
        <section className="post-row split-40x60">
          {featuredPostPaired.map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
        </section>
        <section className="newsletter-signup">
          <NewsletterForm formId="a3ab65eb-bed1-456e-a221-7310a4bf4d7e" />
        </section>
        {postRowChunks[1] && (
          <section className="post-row split-33">
            {postRowChunks[1].map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
          </section>
        )}
      </div>
      <NewsletterPopup wait={5000} />
    </div>
  );
};

export default withRouteData(HomePage);
