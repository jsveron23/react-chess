const Path = require('../libs/path')
const colors = require('colors') // eslint-disable-line

/**
 * Webpack loaders
 * @type {Object}
 */
const LOADERS = {
  eslint: {
    test: /\.js$/,
    include: [Path.resolve('src')],
    loader: 'eslint-loader',
    options: {
      configFile: `${Path.resolve.repoDir}/.eslintrc.json`
    }
  },

  javascript: {
    test: /\.js$/,
    include: [Path.resolve('src')],
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
        path: `${Path.resolve('scripts')}/postcss/postcss.config.js`
      }
    }
  },

  svg: {
    test: /\.svg$/,
    use: ['babel-loader', {
      loader: 'react-svg-loader',
      options: {
        jsx: true
      }
    }]
  }
}

/**
  * Get loaders
  * @param  {boolean?} isFallback
  * @return {Function}
  */
function _get (isFallback) {
  return (...types) => {
    const loaders = types.reduce((acc, loaderName) => {
      const loader = LOADERS[loaderName]

      if (!loader) {
        console.log(`${loaderName}-loader not found!`.underline.red)

        return acc
      }

      return [...acc, loader]
    }, [])

    if (isFallback) {
      const [loader] = loaders

      return loader
    }

    return loaders
  }
}

const get = _get()
get.fallback = _get(false)('style')

module.exports = {
  get
}
