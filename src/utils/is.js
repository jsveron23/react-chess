function _isEmpty (isSome = false) {
  function _is (v) {
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

  return (...x) => isSome
    ? x.some(_is)
    : x.every(_is)
}

function _isExist (isSome = false) {
  const _is = _isEmpty(isSome)

  return (...x) => isSome
    ? x.some((v) => !_is(v))
    : x.every((v) => !_is(v))
}

/**
 * @module utils/is
 * ================
 */

const isEmpty = _isEmpty()
isEmpty.or = _isEmpty(true)

const isExist = _isExist()
isExist.or = _isExist(true)

export {
  isEmpty,
  isExist
}
