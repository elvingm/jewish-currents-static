import React from 'react';
import webpack from './webpack.config.js';
import { getPosts, getCategories } from './src/wordpress/fetch';

export default {
  // Webpack config from file
  webpack,
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish | A Progressive, Secular Voice',
    description: 'A progressive, secular voice.'
  }),
  getRoutes: async () => {
    const posts = await getPosts();
    const categories = await getCategories();
    return [
      {
        path: '/',
        component: 'src/App/pages/Home',
        getData: async () => ({
          currentPage: 'home',
          posts
        }),
        children: posts.map(post => ({
          path: `/${post.slug}`,
          component: 'src/App/pages/Post',
          getData: async () => ({
            currentPage: 'post',
            post,
            categories
          })
        }))
      },
      {
        path: '/about',
        component: 'src/App/pages/About',
        getData: () => ({
          currentPage: 'about'
        })
      },
      {
        is404: true,
        component: 'src/App/pages/404'
      }
    ];
  },
  Document: ({ Html, Head, Body, children, siteData }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jewish Currents » Feed"
          href="http://jewishcurrents.org/feed/"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jewish Currents » Comments Feed"
          href="http://jewishcurrents.org/comments/feed/"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jewish Currents » Articles Category Feed"
          href="http://jewishcurrents.org/category/articles/feed/"
        />
        <title>{siteData.title}</title>
        <meta name="description" content={siteData.description} />
      </Head>
      <Body>{children}</Body>
    </Html>
  )
};
