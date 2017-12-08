/**
 * Get absolute path, project root path where NPM script runs
 * @param  {String?} name
 * @return {String}
 */
function getAbsPath (name) {
  const path = [process.cwd(), name ? `/${name}` : ''].filter(p => !!p)

  return replaceSeparator(path)
}

/**
 * Separator
 * @param  {Array} path
 * @return {Array}
 */
function replaceSeparator (path) {
  const isWin = /^win/.test(process.platform)

  return path.join('').split(/\\|\//).join(isWin ? '\\' : '/')
}

module.exports = {
  repoPath: getAbsPath(),
  confPath: getAbsPath('config'),
  distPath: getAbsPath('public'),
  srcPath: getAbsPath('src'),
  assetsPath: getAbsPath('src/assets'),
  getAbsPath
}
