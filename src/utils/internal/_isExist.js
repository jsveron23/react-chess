import _detectEmpty from './_detectEmpty'

/**
 * @param  {String}   fnName
 * @return {Function}
 */
function _isExist (fnName) {
  /**
   * @param  {...*}    [...args]
   * @return {Boolean}
   */
  return (...args) => {
    const fn = args[fnName].bind(args)

    return fn((x) => !_detectEmpty(x))
  }
}

export default _isExist
