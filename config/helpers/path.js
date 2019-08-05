const resolve = require('./internal/resolve')(process.platform === 'win32', process.cwd())

exports.resolve = resolve
exports.root = resolve()
exports.webpack = resolve('config', 'webpack')
