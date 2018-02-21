const isWin = process.platform === 'win32'
const separator = isWin ? '\\' : '/'
const getAbsPath = (...items) => items
  .reduce((p, n) => `${p}${separator}${n}`, process.cwd())

module.exports = {
  repoPath: getAbsPath(),
  confPath: getAbsPath('config'),
  distPath: getAbsPath('public'),
  srcPath: getAbsPath('src'),
  assetsPath: getAbsPath('src', 'assets'),
  getAbsPath
}
