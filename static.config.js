import React from 'react';
import { isArray } from 'lodash';
import webpack from './webpack.config.js';
import fetchData from './src/datocms/fetch';
import { SITE_PRIMARY_COLOR, POST_PRIMARY_COLOR } from './src/App/util/constants';

const makeAuthorRoutes = (authors, posts) => {
  const routes = authors.map(author => {
    const authorPosts = posts.filter(p => p.authors.id === author.id).slice(0, 50);
    return {
      path: `/author/${author.slug}`,
      component: 'src/App/pages/Author',
      getData: async () => ({
        themePrimaryColor: author.themePrimaryColor || SITE_PRIMARY_COLOR,
        currentPage: 'author',
        posts: authorPosts,
        author
      })
    };
  });

  return routes;
};

const makeCategoryRoutes = (categories, posts) => {
  const routes = categories.map(category => {
    const categoryPosts = posts
      .filter(p => {
        const postCategory = isArray(p.categories) ? p.categories[0] : p.categories;
        return postCategory.id === category.id;
      })
      .slice(0, 50);

    return {
      path: `/${category.slug}`,
      component: 'src/App/pages/Category',
      getData: async () => ({
        themePrimaryColor: category.themePrimaryColor || SITE_PRIMARY_COLOR,
        currentPage: 'category',
        posts: categoryPosts,
        category
      })
    };
  });

  return routes;
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
