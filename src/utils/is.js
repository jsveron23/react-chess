const _isEmpty = (v) => {
  if (typeof v === 'function') {
    return false
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
