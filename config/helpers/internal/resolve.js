/**
 * Get absolute path
 * @param  {Boolean?} isWin
 * @param  {String?}  cwd
 * @return {Function}
 */
module.exports = function createResolve (isWin, cwd) {
  const separator = isWin ? '\\' : '/'

  /**
   * @param  {...String} [...args]
   * @return {String}
   */
  return (...args) => {
    return args.reduce((acc, arg) => `${acc}${separator}${arg}`, cwd)
  }
}
