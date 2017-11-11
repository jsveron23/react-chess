/**
 * Get absolute path, project root path where NPM script runs
 * @param  {String?} name
 * @return {String}
 */
const getAbsPath = name => [process.cwd(), name].filter(p => !!p).join('/')

module.exports = {
  repoPath: getAbsPath(),
  buildPath: getAbsPath('build'),
  pubPath: getAbsPath('public'),
  srcPath: getAbsPath('src'),
  assetsPath: getAbsPath('src/assets'),
  getAbsPath
}
