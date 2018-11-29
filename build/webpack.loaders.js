const { repoPath, buildPath, srcPath } = require('./path')

/**
 * Webpack loaders
 * @namespace Loaders
 */
const LOADERS = {
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
        path: `${buildPath}/postcss/postcss.config.js`
      }
    }
  },

  svg: {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true
        }
      }
    ]
  }
}
/**
  * Get loaders
  * @param  {string}       type
  * @return {Array|string}
  */
function get (type) {
  const loaders = type
    .split(' ')
    .reduce((lds, t) => {
      const l = LOADERS[t]

      if (!l) {
        console.log(`${t}-loader not found!`)

        return lds
      }

      return lds.concat(l)
    }, [])
  let loader

  if (loaders.length === 0) {
    throw new Error(`Loader not found!`)
  } else if (loaders.length === 1) {
    [loader] = loaders
  }

  return loader || loaders
}

module.exports = {
  get
}
