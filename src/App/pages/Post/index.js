import React from 'react';
import { Head, Link, withRouteData } from 'react-static';
import { isArray } from 'lodash';
//
import './style.css';
import { SITE_DOMAIN, MONTH_NAMES } from '../../util/constants';
import { toRGBString } from '../../util/helpers';
// import PostListCondensed from '../../components/PostListCondensed';
import Image from '../../components/Image';
import MoreArticlesLink from '../../components/MoreArticlesLink';
import SubscribeCallout from '../../components/SubscribeCallout';
import Newsletter from '../../components/Newsletter';
import SocialLink from '../../components/SocialLink';

const PostPage = ({ post, themePrimaryColor }) => {
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
      {post.featuredImage && (
        <div className="featured-image g-border-wrap">
          <Image src={post.featuredImage.path} alt={post.featuredImage.alt} />
        </div>
      )}
      <div className="post-body">
        <article>
          <header>
            {post.featured && (
              <div className="featured-image g-border-wrap">
                <Image src={post.featuredImage.path} alt={post.featuredImage.alt} />
              </div>
            )}
            <h3 className="label">{category.title}</h3>
            <h1 className="g-accent" dangerouslySetInnerHTML={{ __html: post.title }} />
            <p>
              <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
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
          <div className="related-posts">
            <h2 className="g-accent">Further Reading</h2>
          </div>
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
        </div>
        <SubscribeCallout />
      </section>
      <section className="signup-wrap">
        <Newsletter />
        <MoreArticlesLink />
      </section>
    </div>
  );
};

export default withRouteData(PostPage);
