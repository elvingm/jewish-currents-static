import React from 'react';
import { Head, Link, withRouteData } from 'react-static';
import { isArray } from 'lodash';
//
import './style.css';
import { SITE_DOMAIN, MONTH_NAMES } from '../../util/constants';
import { toRGBString } from '../../util/helpers';
import FurtherReadingUnit from '../../components/FurtherReadingUnit';
import Image from '../../components/Image';
import SubscribeCallout from '../../components/SubscribeCallout';
import NewsletterForm from '../../components/NewsletterForm';
import SocialLink from '../../components/SocialLink';
import PostListCondensed from '../../components/PostListCondensed';

const PostPage = ({ post, themePrimaryColor, furtherReadingUnit }) => {
  const date = new Date(post.publishedAt);
  const postUrl = `${SITE_DOMAIN}/${post.slug}`;
  const category = isArray(post.categories) ? post.categories[0] : post.categories;
  const themeCss = `
    .g-accent {
      color: ${toRGBString(themePrimaryColor)};
    }
    blockquote {
      color: ${toRGBString(themePrimaryColor)};
    }
  `;
  return (
    <div id="post">
      <Head>
        <style>{themeCss}</style>
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
                <div className="post-image g-border-wrap">
                  <Image
                    src={post.postImage ? post.postImage.path : post.featuredImage.path}
                    alt={post.postImage ? post.postImage.alt : post.featuredImage.alt}
                  />
                </div>
              )}
            <h3 className="label">{category.title}</h3>
            <h1 className="g-accent" dangerouslySetInnerHTML={{ __html: post.title }} />
            <p>
              <span className="date">{`${
                MONTH_NAMES[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()}`}</span>
              <Link className="author g-underline-link" to={`/author/${post.authors.slug}`}>
                {post.authors.name}
              </Link>
            </p>
          </header>
          <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <aside className="share-icons">
          <SocialLink
            url={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            network="facebook"
            iconColor="#000"
          />
          <SocialLink
            url={`https://twitter.com/intent/tweet?url=${postUrl}`}
            network="twitter"
            iconColor="#000"
          />
        </aside>
        <aside className="sidebar">
          <div className=".g-ad_350x600 g-border-wrap">
            <h3>Ad</h3>
          </div>
          <FurtherReadingUnit {...furtherReadingUnit} />
        </aside>
      </div>
      <section className="share-article">
        <h2>
          Share <span>this article</span>
        </h2>
        <div className="share-icons">
          <SocialLink
            url={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            network="facebook"
            iconColor="#000"
          />
          <SocialLink
            url={`https://twitter.com/intent/tweet?url=${postUrl}`}
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
        <NewsletterForm />
      </section>
    </div>
  );
};

export default withRouteData(PostPage);
