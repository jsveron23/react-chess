/**
 * Get absolute path, project root path where NPM script runs
 * @param  {String?} name
 * @return {String}
 */
function getAbsPath (name) {
  const isWin = /^win/.test(process.platform)

  return [process.cwd(), name].filter(p => !!p).join(isWin ? '\\' : '/')
}

module.exports = {
  repoPath: getAbsPath(),
  confPath: getAbsPath('config'),
  distPath: getAbsPath('public'),
  srcPath: getAbsPath('src'),
  assetsPath: getAbsPath('src/assets'),
  getAbsPath
}
