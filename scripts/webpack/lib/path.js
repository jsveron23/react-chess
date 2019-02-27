/**
 * Get absolute path
 * @param  {boolean}  isWin
 * @param  {string}   cwd
 * @return {Function}
 */
function createResolve (isWin, cwd) {
  const separator = isWin ? '\\' : '/'

  return (...args) => {
    return args.reduce((acc, arg) => `${acc}${separator}${arg}`, cwd)
  }
}

const resolve = createResolve(process.platform === 'win32', process.cwd())

module.exports = {
  resolve,
  root: resolve()
}
