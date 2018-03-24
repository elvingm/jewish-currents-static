import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getPosts } from './src/wordpress/fetch';

export default {
  // Global Site Data -
  getSiteData: () => ({
    title: 'Jewish Currents | A Progressive, Secular Voice'
  }),
  getRoutes: async () => {
    const posts = await getPosts();
    return [
      {
        path: '/',
        component: 'src/App/containers/Home',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/${post.slug}`,
          component: 'src/App/containers/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        path: '/about',
        component: 'src/App/containers/About'
      },
      {
        is404: true,
        component: 'src/App/containers/404'
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
