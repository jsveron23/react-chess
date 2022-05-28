const Path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const src = Path.resolve(__dirname, 'src');
const dist = Path.resolve(__dirname, 'public');
const assets = Path.resolve(__dirname, 'src', 'assets');

module.exports = function configure(env, { mode = 'development' }) {
  const isDev = mode === 'development';

  const optimization = {
    chunkIds: isDev ? 'named' : 'deterministic',
    moduleIds: 'named',
    emitOnErrors: true,
    nodeEnv: mode,
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {},
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  };

  const rules = [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [src],
      options: {
        plugins: [isDev && require.resolve('react-refresh/babel')].filter(
          Boolean
        ),
      },
    },
    {
      test: /\.css$/,
      include: [src],
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[local]--[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
              mode: (resourcePath) => {
                if (/app.css$/i.test(resourcePath)) {
                  return 'global';
                }

                return 'local';
              },
            },
            importLoaders: 1, // postcss-loader
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: () => {
              return {
                plugins: {
                  'postcss-import': {},
                  'postcss-preset-env': {
                    features: {
                      'overflow-property': true,
                      'not-pseudo-class': true,
                      'all-property': true,
                      'nesting-rules': true,
                    },
                  },
                },
              };
            },
          },
        },
      ].filter(Boolean),
    },
    {
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'svg-react-loader',
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
  ];

  const plugins = [
    new NodePolyfillPlugin(),
    new HtmlPlugin({
      inject: 'body',
      chunks: ['app'],
      filename: 'index.html',
      template: `${assets}/index.html`,
      minify: {
        removeComments: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    isDev && new ReactRefreshPlugin(),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
  ].filter(Boolean);

  const config = {
    target: 'web',
    context: src,
    devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
    watchOptions: {
      aggregateTimeout: 700,
    },
    performance: {
      hints: isDev ? false : 'warning',
    },
    entry: {
      app: [
        isDev && 'webpack-dev-server/client?http://localhost:3000',
        isDev && 'webpack/hot/only-dev-server',
        './index',
      ].filter(Boolean),
    },
    output: {
      publicPath: '/',
      path: dist,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
    },
    resolve: {
      alias: { '~': src },
    },
    module: { rules },
    optimization,
    plugins,
    mode,
  };

  if (isDev) {
    Object.assign(config, {
      devServer: {
        hot: true,
        compress: true,
        historyApiFallback: true,
        port: 3000,
        host: 'localhost',
      },
    });
  }

  return config;
};
