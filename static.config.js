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

const makeTagRoutes = (tags, posts) => {
  const routes = tags.map(tag => {
    const tagPosts = posts.filter(p => {
      if (isArray(p.tags)) {
        return p.tags.find(postTag => tag.id === postTag.id);
      }

      return p.tags.id === tag.id;
    });

    return paginateItems({
      items: tagPosts,
      parent: tag,
      pageSize: 20,
      route: {
        path: `/tag/${tag.slug}`,
        component: 'src/App/pages/Tag'
      },
      decorate: (posts, tag) => ({
        getData: () => ({
          themePrimaryColor: SITE_PRIMARY_COLOR,
          currentPage: 'tag',
          tag,
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
    title: 'Jewish Currents',
    description: 'A progressive, secular voice.'
  }),
  getRoutes: async () => {
    const { models, content } = await fetchData();
    const {
      post,
      author,
      category,
      tag,
      home_page: homePage,
      privacy_policy: privacyPolicy,
      submissions_page: submissionsPage,
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
      {
        path: '/submit',
        component: 'src/App/pages/Submissions',
        getData: () => submissionsPage[0]
      },
      ...makeAuthorRoutes(author, post),
      ...makeCategoryRoutes(category, post),
      ...makeTagRoutes(tag, post),
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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="image" content="https://jewishcurrents.org/img/share-image-salmon.png" />

        {/* Schema.org for Google */}
        <meta item="name" content={siteData.title} />
        <meta item="description" content={siteData.description} />
        <meta item="image" content="https://jewishcurrents.org/img/share-image-salmon.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteData.title} />
        <meta name="twitter:description" content={siteData.description} />
        <meta
          name="twitter:image:src"
          content="https://jewishcurrents.org/img/share-image-green.png"
        />

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content={siteData.title} />
        <meta name="og:description" content={siteData.description} />
        <meta name="og:image" content="https://jewishcurrents.org/img/share-image-green.png" />
        <meta name="og:url" content="https://jewishcurrents.org" />
        <meta name="og:site_name" content={siteData.title} />
        <meta name="og:type" content="website" />
        <title>{siteData.title}</title>
        <meta name="description" content={siteData.description} />
      </Head>
      <Body>
        {children}
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
