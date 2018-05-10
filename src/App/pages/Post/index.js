import React from 'react';
import { Head, Link, withRouteData } from 'react-static';
import { isArray } from 'lodash';
import striptags from 'striptags';
//
import './style.css';
import { MONTH_NAMES } from '../../util/constants';
import { toRGBString, toAssetURL } from '../../util/helpers';
import FurtherReadingUnit from '../../components/FurtherReadingUnit';
import Image from '../../components/Image';
import SubscribeCallout from '../../components/SubscribeCallout';
import NewsletterForm from '../../components/NewsletterForm';
import SocialLink from '../../components/SocialLink';
import PostListCondensed from '../../components/PostListCondensed';
import NewsletterPopup from '../../components/NewsletterPopup';

const PostPage = ({ post, themePrimaryColor, furtherReadingUnit }) => {
  const date = new Date(post.publishedAt);
  const category = isArray(post.categories) ? post.categories[0] : post.categories;
  const excerpt = post.excerpt ? post.excerpt : `${striptags(post.content).slice(0, 200)}`;
  const shareImage =
    (post.seoMeta && post.seoMeta) || post.featuredImage || post.postImage || post.thumbnailImage;
  const shareImageURL = shareImage && toAssetURL(shareImage.path);
  const shareUrl = `${SITE_BASE_URL}/${category.slug}/${post.slug}`; // eslint-disable-line no-undef
  const meta = {
    title: (post.seoMeta && post.seoMeta.title) || post.title,
    description: (post.seoMeta && post.seoMeta.description) || excerpt
  };
  const themeCss = `
    .g-accent {
      color: ${toRGBString(themePrimaryColor)};
    }
    .pullquote {
      color: ${toRGBString(themePrimaryColor)};
    }
  `;
  return (
    <div id="post">
      <Head>
        <style>{themeCss}</style>
        <meta name="description" content={meta.description} />

        {/* Schema.org for Google */}
        <meta item="name" content={meta.title} />
        <meta item="description" content={meta.description} />
        {shareImageURL && <meta item="image" content={shareImageURL} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {shareImageURL && <meta name="twitter:image:src" content={shareImageURL} />}

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        {shareImageURL && <meta property="og:image" content={shareImageURL} />}
        <meta property="og:url" content={shareUrl} />
      </Head>
      {post.featuredPost &&
        post.featuredImage && (
          <div className="featured-image g-border-wrap">
            <Image src={post.featuredImage.path} alt={post.featuredImage.alt} />
          </div>
        )}
      <div className="post-body">
        <article>
          <header>
            {!post.featuredPost &&
              (post.postImage || post.featuredImage) && (
                <figure className="post-image">
                  <div className="g-border-wrap">
                    <Image
                      src={post.postImage ? post.postImage.path : post.featuredImage.path}
                      alt={post.postImage ? post.postImage.alt : post.featuredImage.alt}
                    />
                  </div>
                  {post.headerImageCaption && (
                    <figcaption dangerouslySetInnerHTML={{ __html: post.headerImageCaption }} />
                  )}
                </figure>
              )}
            <h3 className="label">{category.title}</h3>
            <h1 className="g-accent" dangerouslySetInnerHTML={{ __html: post.title }} />
            <div>
              <span className="date">
                {`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
              </span>
              {isArray(post.authors) ? (
                <div className="authors">
                  {post.authors.map((author, idx) => (
                    <Link
                      className="author g-underline-link"
                      to={`/author/${author.slug}`}
                      key={author.id}
                    >
                      <span>{author.name}</span>
                      {idx >= 0 && idx < post.authors.length - 1 && <span>,</span>}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link className="author g-underline-link" to={`/author/${post.authors.slug}`}>
                  {post.authors.name}
                </Link>
              )}
            </div>
          </header>
          <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <aside className="share-icons">
          <SocialLink
            shareUrl={shareUrl}
            shareText={post.title}
            network="facebook"
            iconColor="#000"
          />
          <SocialLink
            shareUrl={shareUrl}
            shareText={post.title}
            network="twitter"
            iconColor="#000"
          />
        </aside>
        <aside className="sidebar">
          {/* <div className=".g-ad_350x600 g-border-wrap">
            <h3>Ad</h3>
          </div> */}
          <FurtherReadingUnit {...furtherReadingUnit} />
        </aside>
      </div>
      <section className="share-article">
        <h2>
          Share <span>this article</span>
        </h2>
        <div className="share-icons">
          <SocialLink shareUrl={shareUrl} network="facebook" iconColor="#000" />
          <SocialLink
            shareUrl={shareUrl}
            shareText={post.title}
            network="twitter"
            iconColor="#000"
          />
        </div>
      </section>
      <section className="split-wrap">
        <div className="further-reading">
          <h2>Further Reading</h2>
          <div className="line-divider" />
          <PostListCondensed posts={furtherReadingUnit.posts} />
        </div>
        <SubscribeCallout />
      </section>
      <section className="newsletter-signup">
        <NewsletterForm formId="a3ab65eb-bed1-456e-a221-7310a4bf4d7e" />
      </section>
      <NewsletterPopup wait={5000} />
    </div>
  );
};

export default withRouteData(PostPage);
