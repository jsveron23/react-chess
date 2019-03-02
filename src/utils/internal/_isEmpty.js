import _detectEmpty from './_detectEmpty'

/**
 * @param  {string}   fnName
 * @return {Function}
 */
function _isEmpty (fnName) {
  return (...args) => {
    const fn = args[fnName].bind(args)

    return fn((x) => _detectEmpty(x))
  }
}

export default _isEmpty
