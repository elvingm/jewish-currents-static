import React from 'react';
import { isArray, flatten } from 'lodash';
import webpack from './webpack.config.js';
import fetchData from './src/datocms/fetch';
import { SITE_PRIMARY_COLOR, POST_PRIMARY_COLOR } from './src/App/util/constants';

const paginateItems = ({ items, parent, pageSize, pageToken = 'page', route, decorate }) => {
  const itemsCopy = [...items]; // Make a copy of the items
  const pages = []; // Make an array for all of the different pages

  while (itemsCopy.length) {
    // Splice out all of the items into separate pages using a set pageSize
    pages.push(itemsCopy.splice(0, pageSize));
  }

  // Move the first page out of pagination. This is so page one doesn't require a page number.
  const firstPage = pages.shift();

  const routes = [
    {
      ...route,
      ...decorate(firstPage, parent)
    },
    // map over each page to create an array of page routes, and spread it!
    ...pages.map((page, i) => ({
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${i + 2}`,
      ...decorate(page, parent)
    }))
  ];

  return routes;
};

const makeAuthorRoutes = (authors, posts) => {
  const routes = authors.map(author => {
    const authorPosts = posts.filter(p => {
      const postAuthor = isArray(p.authors) ? p.authors[0] : p.authors;
      return postAuthor && postAuthor.id === author.id;
    });

    return paginateItems({
      items: authorPosts,
      parent: author,
      pageSize: 20,
      route: {
        path: `/author/${author.slug}`,
        component: 'src/App/pages/Author'
      },
      decorate: (posts, author) => ({
        getData: () => ({
          themePrimaryColor: author.themePrimaryColor || SITE_PRIMARY_COLOR,
          currentPage: 'author',
          author,
          posts
        })
      })
    });
  });

  return flatten(routes);
};

const makeCategoryRoutes = (categories, posts) => {
  const routes = categories.map(category => {
    const categoryPosts = posts.filter(p => {
      const postCategory = isArray(p.categories) ? p.categories[0] : p.categories;
      return postCategory && postCategory.id === category.id;
    });

    return paginateItems({
      items: categoryPosts,
      parent: category,
      pageSize: 20,
      route: {
        path: `/category/${category.slug}`,
        component: 'src/App/pages/Category'
      },
      decorate: (posts, category) => ({
        getData: () => ({
          themePrimaryColor: category.themePrimaryColor || SITE_PRIMARY_COLOR,
          currentPage: 'category',
          category,
          posts
        })
      })
    });
  });

  return flatten(routes);
};

const makePostRoutes = (posts, furtherReadingUnit) => {
  const routes = posts.map(post => {
    const category = isArray(post.categories) ? post.categories[0] : post.categories;
    return {
      path: `/${category.slug}/${post.slug}`,
      component: 'src/App/pages/Post',
      getData: () => ({
        themePrimaryColor: post.themePrimaryColor || POST_PRIMARY_COLOR,
        currentPage: 'post',
        furtherReadingUnit,
        post
      })
    };
  });

  return routes;
};

const organizeContentByType = (content, models) => {
  const organized = {};
  models.forEach(model => {
    organized[model.apiKey] = [];
  });
  content.forEach(item => {
    const modelName = item.meta.contentType.name;
    organized[modelName].push(item);
  });
  return organized;
};

export default {
  // Webpack config from file
  webpack,
  siteRoot: 'https://jewishcurrents-production.netlify.com',
  stagingSiteRoot: 'https://jewishcurrents-staging.netlify.com',
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish | A Progressive, Secular Voice',
    description: 'A progressive, secular voice.'
  }),
  getRoutes: async () => {
    const { models, content } = await fetchData();
    const {
      post,
      author,
      category,
      home_page: homePage,
      privacy_policy: privacyPolicy,
      further_reading_unit: furtherReadingUnit
    } = organizeContentByType(content, models);

    return [
      {
        path: '/',
        component: 'src/App/pages/Home',
        getData: () => ({
          currentPage: 'home',
          ...homePage[0]
        })
      },
      {
        path: '/about',
        component: 'src/App/pages/About',
        getData: () => ({
          currentPage: 'about',
          footerColor: { red: 255, green: 191, blue: 0 }
        })
      },
      {
        path: '/about/privacy-policy',
        component: 'src/App/pages/PrivacyPolicy',
        getData: () => privacyPolicy[0]
      },
      ...makeAuthorRoutes(author, post),
      ...makeCategoryRoutes(category, post),
      ...makePostRoutes(post, furtherReadingUnit.find(u => u.setAsDefault)),
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
        <title>{siteData.title}</title>
        <meta name="description" content={siteData.description} />
      </Head>
      <Body>
        {children}
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
        <script
          dangerouslySetInnerHTML={{ __html: `var _ctct_m = "21a5ee28f6c0fefe44a395c76e74b213";` }}
        />
        <script
          id="signupScript"
          src="//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js"
          async
          defer
        />
      </Body>
    </Html>
  )
};
