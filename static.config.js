import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getPosts, getCategories } from './src/wordpress/fetch';

export default {
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish Currents | A Progressive, Secular Voice'
  }),
  getRoutes: async () => {
    const posts = await getPosts();
    const categories = await getCategories();
    return [
      {
        path: '/',
        component: 'src/App/pages/Home',
        getData: async () => ({
          posts,
          categories
        }),
        children: posts.map(post => ({
          path: `${post.slug}`,
          component: 'src/App/pages/Post',
          getData: async () => ({
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
  }
};
