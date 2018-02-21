const { repoPath, confPath, srcPath } = require('../../lib/path')

/** @namespace Loaders */
const Loaders = {
  list: {
    // eslint
    eslint: {
      test: /\.js$/,
      include: [srcPath],
      loader: 'eslint-loader',
      options: {
        configFile: `${repoPath}/.eslintrc.json`
      }
    },

    // javascript
    javascript: {
      test: /\.js$/,
      include: [srcPath],
      loader: 'babel-loader'
    },

    // inline css
    style: 'style-loader',

    // css
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

    // postcss
    postcss: {
      loader: 'postcss-loader',
      options: {
        config: {
          path: `${confPath}/postcss.config.js`
        }
      }
    }
  },

  get (type = '') {
    const loaders = type
      .split(' ')
      .reduce((lds, t) => {
        const l = this.list[t]

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
}

module.exports = Loaders
