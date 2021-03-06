import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { DefinePlugin } from 'webpack';

// postcssLoader exports the webpack config for all styles
const postcssLoader = env => {
  const loader = {
    // Local development server
    dev: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { importLoaders: 1 } },
      { loader: 'postcss-loader' }
    ],
    // Production build
    prod: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true,
            sourceMap: false
          }
        },
        { loader: 'postcss-loader' }
      ]
    })
  };

  return {
    test: /\.css$/,
    use: env !== 'node' ? loader[env] : loader.prod
  };
};

export default (config, { defaultLoaders, stage }) => {
  if (stage === 'prod') {
    config.entry = ['babel-polyfill', config.entry];
  } else if (stage === 'dev') {
    config.entry = ['babel-polyfill', ...config.entry];
  }

  config.plugins.push(
    new DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      SITE_BASE_URL: JSON.stringify(process.env.SITE_BASE_URL),
      SITE_SEARCH_TOKEN: JSON.stringify(process.env.SITE_SEARCH_TOKEN),
      STRIPE_API_KEY: JSON.stringify(process.env.STRIPE_API_KEY),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY)
    })
  );

  config.module.rules = [
    {
      oneOf: [
        postcssLoader(stage),
        defaultLoaders.cssLoader,
        defaultLoaders.jsLoader,
        defaultLoaders.fileLoader
      ]
    }
  ];

  return config;
};
