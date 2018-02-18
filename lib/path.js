const isWin = /^win/.test(process.platform)
const getAbsPath = (name = '') => [process.cwd(), name]
  .join('/')
  .replace(/\\|\//, isWin ? '\\' : '/')

module.exports = {
  repoPath: getAbsPath(),
  confPath: getAbsPath('config'),
  distPath: getAbsPath('public'),
  srcPath: getAbsPath('src'),
  assetsPath: getAbsPath('src/assets'),
  getAbsPath
}
