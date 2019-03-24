import * as R from 'ramda'

/**
 * @param  {String}   fnName
 * @return {Function}
 */
function _isEmpty (fnName) {
  /**
   * @param  {...*}    [...args]
   * @return {Boolean}
   */
  return (...args) => {
    const fn = args[fnName].bind(args)

    return fn((x) => R.isEmpty(x) || R.isNil(x))
  }
}

export default _isEmpty
