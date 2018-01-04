const { repoPath, confPath, srcPath } = require('../../lib/path')

/**
 * Loaders
 * @namespace Loaders
 */
const Loaders = {
  loaderList: {
    eslint: {
      test: /\.js$/,
      include: [srcPath],
      loader: 'eslint-loader',
      options: {
        configFile: `${repoPath}/.eslintrc.json`
      }
    },
    javascript: {
      test: /\.js$/,
      include: [srcPath],
      loader: 'babel-loader'
    },
    style: 'style-loader',
    css: {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        module: true,
        importLoaders: 1,
        localIdentName: '[local]--[hash:base64:5]',
        camelCase: 'only'
      }
    },
    postcss: {
      loader: 'postcss-loader',
      options: {
        config: {
          path: `${confPath}/postcss.config.js`
        }
      }
    }
  },

  /**
   * Get loaders
   * @param  {String}       type
   * @return {Array|String}
   */
  get (type) {
    const loaders = type.split(' ').map(t => this.loaderList[t]).filter(t => !!t)
    let loader

    if (loaders.length === 0) {
      console.log(`No '${type}' loader!`)
    } else if (loaders.length === 1) {
      [loader] = loaders
    }

    return loader || loaders
  }
}

module.exports = Loaders
