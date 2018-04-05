import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';
import { MONTH_NAMES } from '../../util/date';
import { SITE_DOMAIN } from '../../util/constants';
// import PostListCondensed from '../../components/PostListCondensed';
import MoreArticlesLink from '../../components/MoreArticlesLink';
import SubscribeCallout from '../../components/SubscribeCallout';
import Newsletter from '../../components/Newsletter';
import SocialLink from '../../components/SocialLink';

export default withRouteData(({ post }) => {
  const date = new Date(post.date);
  const postUrl = `${SITE_DOMAIN}/${post.slug}`;
  return (
    <div id="post">
      <div className="featured-image g-border-wrap">
        <img src={post.featuredMedia.source_url} alt={post.featuredMedia.alt_text} />
      </div>
      <div className="post-body">
        <article>
          <header>
            <h3 className="label">Featured Article</h3>
            <h1 className="g-accent" dangerouslySetInnerHTML={{ __html: post.title }} />
            <p>
              <span className="date">{`${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`}</span>
              <Link className="author g-underline-link" to={`/author/${post.author.slug}`}>
                {post.author.name}
              </Link>
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
          <div className="ad-placement_350x600 g-border-wrap">
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
});
