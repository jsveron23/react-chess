/**
 * Get absolute path
 * @param  {Boolean?}  isWin
 * @param  {String?}   cwd
 * @return {Function}
 */
function createResolve (isWin, cwd) {
  const separator = isWin ? '\\' : '/'

  /**
   * @param  {...String} [...args]
   * @return {String}
   */
  return (...args) => {
    return args.reduce((acc, arg) => `${acc}${separator}${arg}`, cwd)
  }
}

const resolve = createResolve(process.platform === 'win32', process.cwd())

module.exports = {
  resolve,
  root: resolve(),
  webpack: resolve('scripts', 'webpack')
}
