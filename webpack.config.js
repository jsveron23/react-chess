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
  const config = {
    watchOptions: {
      aggregateTimeout: 700,
    },
    context: src,
    output: {
      publicPath: '/',
      path: dist,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
    },
    target: 'web',
    performance: {
      hints: isDev ? false : 'warning',
    },
    devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
    entry: {
      app: [
        isDev && 'webpack-dev-server/client?http://localhost:3000',
        isDev && 'webpack/hot/only-dev-server',
        './index',
      ].filter(Boolean),
    },
    resolve: {
      // symlinks: false,
      alias: {
        '~': src,
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
      HtmlPlugin &&
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
      isDev && new webpack.HotModuleReplacementPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
        }),
    ].filter(Boolean),
    optimization: {
      chunkIds: isDev ? 'named' : 'deterministic',
      moduleIds: 'named',
      emitOnErrors: true,
      nodeEnv: mode,
      minimize: !isDev,
      minimizer: [
        TerserPlugin &&
          new TerserPlugin({
            minify: TerserPlugin.uglifyJsMinify,
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
      ].filter(Boolean),
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
    },
    module: {
      rules: [
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
                          // browsers: ['last 2 versions', '> 5%'],
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
      ],
    },
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
