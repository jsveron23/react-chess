import _detectEmpty from './_detectEmpty'

/**
 * @param  {string}   fnName
 * @return {Function}
 */
function _isExist (fnName) {
  /**
   * @param  {...*}    [...args]
   * @return {boolean}
   */
  return (...args) => {
    const fn = args[fnName].bind(args)

    return fn((x) => !_detectEmpty(x))
  }
}

export default _isExist
