import Chess from './Chess'

/**
 * Transform multiple dimensional array to single
 * (flatten for only Chess)
 * @param  {Array} arr
 * @return {Array}
 */
export function flatten (arr) {
  if (arr.length === 0) {
    return arr
  }

  const flattenedArr = arr.reduce((a, b) => a.concat(b))
  const shouldFlattened = flattenedArr.every(f => (typeof f === 'string'))

  if (!shouldFlattened) {
    return flatten(flattenedArr)
  }

  return flattenedArr
}

/**
 * Difference
 * @param  {Array} a
 * @param  {Array} b
 * @return {Array}
 */
export function diff (a, b) {
  return a.filter((n, idx) => n !== b[idx])
}

/**
 * Is it empty?
 * @param  {*}       v - variable
 * @return {boolean}
 */
export function isEmpty (v) {
  return (
    v === null ||
    v === undefined ||
    (v.hasOwnProperty('length') && v.length === 0) ||
    (v.constructor === Object && Object.keys(v).length === 0)
  )
}

/**
 * Is it exist?
 * @param  {*}       v - variable
 * @return {boolean}
 */
export function isExist (v) {
  return !isEmpty(v)
}

export { Chess }
