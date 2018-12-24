import React from 'react';
import webpack from './webpack.config.js';
import fetchData from './src/datocms/fetch';
import { makeAuthorRoutes, makePostRoutes, makeCategoryRoutes } from './routes-util';

export default {
  // Webpack config from file
  webpack,
  siteRoot: 'https://jewishcurrents.org',
  stagingSiteRoot: 'https://jewishcurrents-staging.netlify.com',
  devServer: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/.netlify/lambda': '' }
      }
    }
  },
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish Currents',
    description: 'A progressive, secular voice.'
  }),
  getRoutes: async () => {
    const {
      posts,
      authors,
      categories,
      homePage,
      privacyPolicy,
      submissionsPage,
      furtherReadingUnits
    } = await fetchData();

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
      ...makeAuthorRoutes(authors, posts),
      ...makeCategoryRoutes(categories, posts),
      ...makePostRoutes(posts, furtherReadingUnits.find(u => u.setAsDefault)),
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

        {/* Schema.org for Google */}
        <meta item="name" content={siteData.title} data-react-helmet="true" />
        <meta item="description" content={siteData.description} data-react-helmet="true" />
        <meta
          item="image"
          content="https://jewishcurrents.org/img/share-image-salmon.png"
          data-react-helmet="true"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" data-react-helmet="true" />
        <meta name="twitter:title" content={siteData.title} data-react-helmet="true" />
        <meta name="twitter:description" content={siteData.description} data-react-helmet="true" />
        <meta
          name="twitter:image:src"
          content="https://jewishcurrents.org/img/share-image-green.png"
          data-react-helmet="true"
        />

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta property="og:title" content={siteData.title} data-react-helmet="true" />
        <meta property="og:description" content={siteData.description} data-react-helmet="true" />
        <meta
          property="og:image"
          content="https://jewishcurrents.org/img/share-image-green.png"
          data-react-helmet="true"
        />
        <meta property="og:url" content="https://jewishcurrents.org" data-react-helmet="true" />
        <meta property="og:site_name" content="Jewish Currents" data-react-helmet="true" />
        <meta property="og:type" content="website" data-react-helmet="true" />
        <title data-react-helmet="true">{siteData.title}</title>
        <meta name="description" content={siteData.description} data-react-helmet="true" />
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
