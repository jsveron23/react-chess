/**
 * Get absolute path
 * @param  {boolean}  isWin
 * @param  {string}   cwd
 * @return {Function}
 */
function _resolve (isWin, cwd) {
  const separator = isWin ? '\\' : '/'

  return (...args) => {
    return args.reduce((acc, arg) => {
      return `${acc}${separator}${arg}`
    }, cwd)
  }
}

const resolve = _resolve(process.platform === 'win32', process.cwd())
resolve.repoDir = resolve()

module.exports = {
  resolve
}
