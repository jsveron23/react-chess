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
 * @param  {Array} arr
 * @return {Array}
 */
export const diet = arr => arr.filter(item => !!item)

/**
 * Difference
 * @param  {Array} a
 * @param  {Array} b
 * @return {Array}
 */
export const diff = (a, b) => a.filter((n, idx) => n !== b[idx])

/**
 * Is it empty?
 * @param  {*}       value
 * @return {boolean}
 */
export const isEmpty = value => (
  value === null ||
  value === undefined ||
  (value.hasOwnProperty('length') && value.length === 0) ||
  (value.constructor === Object && Object.keys(value).length === 0)
)

/**
 * Is it exist?
 * @param  {*}       value
 * @return {boolean}
 */
export const isExist = value => !isEmpty(value)
