/**
 * Noop
 */
const noop = function () {}

/**
 * Compose
 */
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

/**
 * Pipe
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

/**
 * Flatten
 */
export const flatten = (items = []) =>
  items.reduce((v, item) => v.concat(Array.isArray(item) ? flatten(item) : item), [])

/**
 * Get first item
 */
export const getFirstItem = (items = []) => [...items].shift()

/**
 * Get last item
 */
export const getLastItem = (items = []) => [...items].pop()

/**
 * Replace first item
 */
export const replaceFirst = (items = []) => (data) => [data, ...items.slice(1, 0)]

/**
 * Replace last item
 */
export const replaceLast = (items = []) => (data) => [...items.slice(0, -1), data]

/**
 * Add item
 */
export const push = (items = []) => (data, isNew = true) =>
  isNew
    ? [...items, data]
    : replaceLast(items)(data)

/**
 * Remove unnecessary items
 */
export const diet = (v) => v.filter(isExist)

/**
 * Difference check
 */
export const isDiff = (a) => (b) => (JSON.stringify(a) !== JSON.stringify(b))

/**
 * Pass argument to next function
 */
export const toss = (key) => (o) => o[key]

/**
 * Functions uses same argument,
 * get results into a array
 */
export const pass = (...fns) => (x) =>
  fns.reduce((v, f = noop) => [...v, f(x)], [])

/**
 * Apply same argument to functions
 */
export const apply = (x) => (...fns) => pass(...fns)(x)

/**
 * To array
 */
export const toArray = (v) => Array.of(v)

/**
 * Turn anything to array => stream
 */
export const stream = toArray

/**
 * Unique
 */
export const unique = (v) => Array.from(new Set(v))

/**
 * Intersection
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const intersection = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filteredSet = new Set([...aSet].filter(x => bSet.has(x)))

  return Array.from(filteredSet)
}

/**
 * Difference
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const diff = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filteredSet = new Set([...aSet].filter(x => !bSet.has(x)))

  return Array.from(filteredSet)
}

/**
 * Union
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const union = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const set = new Set([...aSet, ...bSet])

  return Array.from(set)
}

/**
 * Trace
 */
export const trace = (label) => (v) => {
  console.log(`${label}: `, v)

  return v
}

/**
 * Is it empty?
 */
export const isEmpty = (v) => (
  v === null ||
  v === undefined ||
  (v.hasOwnProperty('length') && v.length === 0) ||
  (v.constructor === Object && Object.keys(v).length === 0)
)

/**
 * Is it exist?
 */
export const isExist = (v) => !isEmpty(v)
