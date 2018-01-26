/**
 * Compose
 * @param  {...Function} fns
 * @return {*}
 */
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

/**
 * Pipe
 * @param  {...Function} fns
 * @return {*}
 */
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

/**
 * Is string?
 * @param  {*}       value
 * @return {boolean}
 */
export const isString = (value) => (typeof value === 'string')

/**
 * Is number
 * @param  {*}       value
 * @return {boolean}
 */
export const isNumber = (value) => (typeof value === 'number')

/**
 * Flatten
 * @param  {Array} items
 * @return {Array}
 */
export const flatten = (items = []) => items.reduce((a, b) => a.concat(b))

/**
 * Deep flatten
 * @param  {Array} items
 * @return {Array}
 */
export const deepFlatten = (items) => {
  if (items.length === 0) {
    return items
  }

  const flattened = flatten(items)
  const isFlattened = flattened.every(isString)

  if (!isFlattened) {
    return deepFlatten(flattened)
  }

  return flattened
}

/**
 * Get last item of array
 * @param  {Array} items
 * @return {Array}
 */
export const getLastItem = (items) => items.slice(-1)

/**
 * Push item but no update original items
 * @param  {Array}    items
 * @param  {*}        data
 * @param  {Boolean?} isNew
 * @return {Array}
 */
export const push = (items, data, isNew = true) =>
  isNew
    ? items.concat(data)
    : replaceLast(items, data)

/**
 * Like push but replace last item
 * @param  {Array} items
 * @param  {*}     data
 * @return {Array}
 */
export const replaceLast = (items, data) => [...items.slice(0, -1), data]

/**
 * Remove unnecessary items
 * @param  {Array|Function} v
 * @return {Array}
 */
export function diet (v) {
  return Array.isArray(v)
    ? v.filter((item) => isExist(item))
    : isExist(v)
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
 * Difference check
 * @param  {*}       a
 * @param  {*}       b
 * @return {boolean}
 */
export function isDiff (a, b) {
  return a !== b
}

/**
 * Is it empty?
 * @param  {*}       v
 * @return {boolean}
 */
export const isEmpty = (v) => (
  v === null ||
  v === undefined ||
  (v.hasOwnProperty('length') && v.length === 0) ||
  (v.constructor === Object && Object.keys(v).length === 0)
)

/**
 * Is it exist?
 * @param  {*}       value
 * @return {boolean}
 */
export const isExist = value => !isEmpty(value)
