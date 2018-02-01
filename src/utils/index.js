/**
 * Compose
 * @param  {...Function} fns
 * @return {*}
 */
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

/**
 * Pipe
 * @param  {...Function} fns
 * @return {*}
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

/**
 * Flatten
 * @param  {Array} items
 * @return {Array}
 */
export const flatten = (items = []) => [].concat.apply([], items)

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
  const shouldFlatten = flattened.some((item) => Array.isArray(item))

  if (shouldFlatten) {
    return deepFlatten(flattened)
  }

  return flattened
}

/**
 * Get last item of array
 * @param  {Array} items
 * @return {Array}
 */
export const getLastItem = (items) => items.slice(0).pop()

/**
 * Push item but no update original items
 * @param  {Array}    items
 * @return {Function}
 */
export const push = (items) => (data, isNew = true) =>
  isNew
    ? [...items, data]
    : replaceLast(items)(data)

/**
 * Like push but replace last item
 * @param  {Array}    items
 * @return {Function}
 */
export const replaceLast = (items) => (data) => [...items.slice(0, -1), data]

/**
 * Remove unnecessary items
 * @param  {Array} v
 * @return {Array}
 */
export const diet = (v) => v.filter((item) => isExist(item))

/**
 * Difference
 * @param  {Array}    a
 * @return {Function}
 */
export const diff = (a) => (b) => a.filter((n, idx) => n !== b[idx])

/**
 * Difference check
 * @param  {*}        a
 * @return {Function}
 */
export const isDiff = (a) => (b) => (JSON.stringify(a) !== JSON.stringify(b))

/**
 * Apply extra arguments
 * - to use composition
 * - argument order is important
 * @param  {Function} fn
 * @param  {*}        args
 * @return {Function}
 */
export const applyExtraArgs = (fn, ...args) => (v) => {
  if (v.constructor === Object) {
    return fn(...Object.values(v), ...args)
  }

  return fn(v, ...args)
}

/**
 * Functions uses same argument then get results into array
 * @param  {...Function} fns
 * @return {Function}
 */
export const commonArg = (...fns) => (x) =>
  fns.reduce((r, f = function () {}) => [...r, f(x)], [])

/**
 * Trace
 * @param  {string} label
 * @return {*}
 */
export const trace = (label) => (v) => {
  console.log(`${label}: `, v)

  return v
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
export const isExist = (value) => !isEmpty(value)
