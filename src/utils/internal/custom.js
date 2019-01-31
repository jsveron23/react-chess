/**
 * Detect empty value whether it is empty
 * @param  {*}       v
 * @return {boolean}
 */
function detectEmpty (v) {
  if (typeof v === 'function' || typeof v === 'symbol') {
    return false
  }

  return (
    v === null ||
    v === undefined ||
    (v.hasOwnProperty('length') && v.length === 0) ||
    (v.constructor === Object && Object.keys(v).length === 0)
  )
}

/**
 * - Default isEmpty function
 * - Decide which function will use
 * @param  {string}   fnName
 * @return {Function}
 */
export const isEmptyFn = (fnName) => (...x) => {
  const fn = x[fnName].bind(x)

  return fn((v) => detectEmpty(v))
}

/**
 * - Default isEmpty function
 * - Decide which function will use
 * @param  {string}   fnName
 * @return {Function}
 */
export const isExistFn = (fnName) => (...x) => {
  const fn = x[fnName].bind(x)

  return fn((v) => !detectEmpty(v))
}
