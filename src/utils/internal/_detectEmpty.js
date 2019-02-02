/**
 * Detect empty value whether it is empty
 * @param  {*}       v
 * @return {boolean}
 */
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

export default _detectEmpty
