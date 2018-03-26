import React from 'react';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getPosts, getCategories } from './src/wordpress/fetch';

export default {
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
        component: 'src/App/pages/About'
      },
      {
        is404: true,
        component: 'src/App/pages/404'
      }
    ];
  },
  webpack: (config, { defaultLoaders, stage }) => {
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.css$/, // support .sss files via postcss-loader
            use:
              stage === 'dev'
                ? [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader' }
                  ]
                : ExtractTextPlugin.extract({
                    use: [
                      {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                          minimize: true,
                          sourceMap: false
                        }
                      },
                      {
                        loader: 'postcss-loader'
                      }
                    ]
                  })
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];
    return config;
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
