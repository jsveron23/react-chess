const Path = require('./libs/path')

const PORT = process.env.PORT || 3000

const NO_PARSE = new RegExp([
  'rimraf',
  'express' // for Heroku
].join('|'))

const VENDOR = [
  'react',
  'react-dom',
  'prop-types',
  'classnames'
]

const DEV_SERVER = {
  hot: true,
  host: '0.0.0.0',
  port: PORT,
  compress: true,
  contentBase: Path.resolve('src', 'assets'),
  disableHostCheck: true, // for Heroku
  historyApiFallback: true
}

const ALIAS = {
  '~': Path.resolve('src')
}

const DEVTOOL = 'cheap-module-eval-source-map'

const DEVTOOL_PROD = 'source-map'

const TARGET = 'web'

module.exports = {
  PORT,
  NO_PARSE,
  VENDOR,
  DEV_SERVER,
  ALIAS,
  DEVTOOL,
  DEVTOOL_PROD,
  TARGET
}
