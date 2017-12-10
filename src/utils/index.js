/**
 * Transform multiple dimensional array to single
 * (this method only for Chess)
 * @param  {Array} items
 * @return {Array}
 */
export function flatten (items) {
  if (items.length === 0) {
    return items
  }

  const flattenedItems = items.reduce((a, b) => a.concat(b))
  const shouldFlattened = flattenedItems.some(f => (typeof f === 'string'))

  if (!shouldFlattened) {
    return flatten(flattenedItems)
  }

  return flattenedItems
}

/**
 * Get last item of array
 * @param  {Array}    items
 * @param  {Boolean?} strip
 * @return {*}
 */
export function getLastItem (items, strip = false) {
  const [last] = items.slice(-1)

  return strip ? last : [last]
}

/**
 * Push item but no update original items
 * @param  {Array}    items
 * @param  {*}        data
 * @param  {Boolean?} isNew
 * @return {Array}
 */
export function push (items, data, isNew = true) {
  return isNew ? items.concat(data) : replaceLast(items, data)
}

/**
 * Like push but replace last item
 * @param  {Array} items
 * @param  {*}     data
 * @return {Array}
 */
export function replaceLast (items, data) {
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
 * @param  {*}       value
 * @return {boolean}
 */
export function isEmpty (value) {
  return (
    value === null ||
    value === undefined ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  )
}

/**
 * Is it exist?
 * @param  {*}       value
 * @return {boolean}
 */
export function isExist (value) {
  return !isEmpty(value)
}
