function emptyFn (v) {
  if (typeof v === 'function' || typeof v === 'symbol') {
    return false
  }

  if (typeof v === 'number' && Number.isNaN(v)) {
    return true
  }

  return (
    v === null ||
    v === undefined ||
    (v.hasOwnProperty('length') && v.length === 0) ||
    (v.constructor === Object && Object.keys(v).length === 0)
  )
}

function _isEmpty (isSome = false) {
  const fnName = isSome ? 'some' : 'every'

  return (...x) => x[fnName](emptyFn)
}

function _isExist (isSome = false) {
  const fnName = isSome ? 'some' : 'every'
  const cb = (v) => !emptyFn(v)

  return (...x) => x[fnName](cb)
}

/**
 * @module utils/is
 * ================
 */

const isEmpty = _isEmpty()
isEmpty.or = _isEmpty(true)

const isExist = _isExist()
isExist.or = _isExist(true)

export { isEmpty, isExist }
