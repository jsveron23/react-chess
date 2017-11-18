/**
 * The port number
 * @type {Number}
 */
const PORT = process.env.PORT || 3000

/**
 * Default Webpack config
 * @type {Object}
 */
const config = {
  port: PORT,
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: PORT,
    disableHostCheck: true,
    historyApiFallback: true
  },

  /**
   * Ignore NPM module during Webpack is compiling - performance
   * @type {RegExp}
   * @see  {@link https://webpack.js.org/configuration/module/#module-noparse}
   */
  noParse: new RegExp([
    'rimraf', 'express'
  ].join('|'))
}

module.exports = config
