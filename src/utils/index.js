function _detectEmpty (v) {
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

function _isEmpty (isSome = false) {
  const fnName = isSome ? 'some' : 'every'

  return (...x) => x[fnName](_detectEmpty)
}

function _isExist (isSome = false) {
  const fnName = isSome ? 'some' : 'every'
  const cb = (v) => !_detectEmpty(v)

  return (...x) => x[fnName](cb)
}

export const isEmpty = _isEmpty()
isEmpty.or = _isEmpty(true)

export const isExist = _isExist()
isExist.or = _isExist(true)

export const isEven = (v) => v % 2 === 0

/**
 * Extract value from object
 * @param  {string} keyName
 * @return {Object}
 */
export const extract = (keyName) => (obj) => {
  const nextObj = { ...obj }

  return nextObj[keyName]
}

/**
 * Trace log while composing
 * @param  {string} logName
 * @return {*}
 */
export const trace = (logName) => (v) => {
  console.log(`${logName}: `, v)

  return v
}

export const noop = function () {}
