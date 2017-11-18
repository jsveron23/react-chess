/**
 * Get absolute path, project root path where NPM script runs
 * @param  {String?} name
 * @return {String}
 */
function getAbsPath (name) {
  return [process.cwd(), name].filter(p => !!p).join('/')
}

module.exports = {
  repoPath: getAbsPath(),
  confPath: getAbsPath('config'),
  distPath: getAbsPath('dist'),
  srcPath: getAbsPath('src'),
  staticPath: getAbsPath('static'),
  getAbsPath
}
