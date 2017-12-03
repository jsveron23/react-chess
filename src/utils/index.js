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
 * Get last item of array
 * @return {*}
 */
export function getLastItem ({
  items = [],
  shouldStrip = false
}) {
  const [last] = items.slice(-1)

  return shouldStrip ? last : [last]
}

/**
 * Push item but no update original items
 * @return {Array}
 */
export function push ({
  items = [],
  data,
  isNew = true
}) {
  return isNew ? items.concat(data) : replaceLast({ items, data })
}

/**
 * Like push but replace last item
 * @return {Array}
 */
export function replaceLast ({
  items = [],
  data
}) {
  return [...items.slice(0, -1), data]
}

/**
 * Remove unnecessary items
 * @param  {Array} arr
 * @return {Array}
 */
export function diet (arr) {
  return arr.filter(item => !!item)
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
