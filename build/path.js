const isWin = process.platform === 'win32'
const separator = isWin ? '\\' : '/'

/**
 * Get absolute path
 * @example resolve('src', 'components') => <absolute path>/src/components
 * @param  {...string} args
 * @return {string}
 */
const resolve = (...args) => args
  .reduce((acc, arg) => `${acc}${separator}${arg}`, process.cwd())

module.exports = {
  repoPath: resolve(),
  confPath: resolve('config'),
  distPath: resolve('public'),
  srcPath: resolve('src'),
  assetsPath: resolve('src', 'assets'),
  resolve
}
