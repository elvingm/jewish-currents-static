import React from 'react';
import webpack from './webpack.config.js';
import {
  getPosts,
  getCategories,
  getAuthors,
  getPostsByAuthor,
  getPostsByCategory
} from './src/wordpress/fetch';

const makeAuthorRoutes = authors => {
  const routes = authors.map(author => ({
    path: `/author/${author.slug}`,
    component: 'src/App/pages/Author',
    getData: async () => ({
      author,
      posts: await getPostsByAuthor(author.id)
    })
  }));

  return routes;
};

const makeCategoryRoutes = categories => {
  const routes = categories.map(category => ({
    path: `/${category.slug}`,
    component: 'src/App/pages/Category',
    getData: async () => ({
      category,
      posts: await getPostsByCategory(category.id)
    })
  }));

  return routes;
};

export default {
  // Webpack config from file
  webpack,
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish | A Progressive, Secular Voice',
    description: 'A progressive, secular voice.'
  }),
  getRoutes: async () => {
    const categories = await getCategories();
    const authors = await getAuthors();
    return [
      {
        path: '/',
        component: 'src/App/pages/Home',
        getData: async () => ({
          currentPage: 'home',
          posts: await getPosts(10)
        })
      },
      {
        path: '/about',
        component: 'src/App/pages/About',
        getData: () => ({
          currentPage: 'about'
        })
      },
      ...makeAuthorRoutes(authors),
      ...makeCategoryRoutes(categories),
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
