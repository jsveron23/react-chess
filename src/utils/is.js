/**
 * Is empty? (Can check empty object, array)
 * @param  {*}       x
 * @return {boolean}
 */
function emptyFn (v) {
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
 * @param  {boolean?} [isSome=?]
 * @return {function}
 */
function _isEmpty (isSome = false) {
  const fnName = isSome ? 'some' : 'every'

  return (...x) => x[fnName](emptyFn)
}

/**
 * @param  {boolean?} [isSome=?]
 * @return {function}
 */
function _isExist (isSome = false) {
  const fnName = isSome ? 'some' : 'every'
  const cb = (v) => !emptyFn(v)

  return (...x) => x[fnName](cb)
}

/**
 * @module utils/is
 * ================
 */

export const isEmpty = _isEmpty()
isEmpty.or = _isEmpty(true)

export const isExist = _isExist()
isExist.or = _isExist(true)

/**
 * Is string?
 * @param  {*}       x
 * @return {boolean}
 */
export const isString = (...x) => {
  const _isString = (v) => {
    return typeof v === 'string'
  }

  return x.every(_isString)
}

/**
 * Is number?
 * @param  {*}       x
 * @return {boolean}
 */
export const isNumber = (...x) => {
  const _isNumber = (v) => {
    return typeof v === 'number'
  }

  return x.every(_isNumber)
}

/**
 * Is array
 * @param  {*}       x
 * @return {boolean}
 */
export const isArray = (...x) => {
  const _isArray = (v) => Array.isArray(v)

  return x.every(_isArray)
}

/**
 * Is object?
 * @param  {*}       x
 * @return {boolean}
 */
export const isObject = (...x) => {
  const _isObject = (v) => {
    return !!v && v.constructor === Object
  }

  return x.every(_isObject)
}

/**
 * Is function?
 * @param  {*}       x
 * @return {boolean}
 */
export const isFunction = (...x) => {
  const _isFunction = (v) => {
    return !!v && typeof v === 'function'
  }

  return x.every(_isFunction)
}

export const isEven = (v) => v % 2 === 0
