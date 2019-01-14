const _isEmpty = (v) => {
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

const _isExist = (v) => {
  return !_isEmpty(v)
}

/**
 * @module utils/is
 * ================
 */

export const isEmpty = (...x) => {
  return x.every(_isEmpty)
}

export const isExist = (...x) => {
  return x.every(_isExist)
}
