const PORT = process.env.PORT || 3000
const config = {
  port: PORT,

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: PORT,
    disableHostCheck: true, // for Heroku
    historyApiFallback: true
  },

  noParse: new RegExp([
    'rimraf',
    'express' // for Heroku
  ].join('|'))
}

module.exports = config
