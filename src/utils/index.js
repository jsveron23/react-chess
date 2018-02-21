const _noop = function () {}

// pending (exportable)
const _isObject = (v) => v.constructor === Object
const _isArray = (v) => Array.isArray(v)
const _change = (from, to) => (item) => (item === from ? to : item)

/** Compose */
export const compose = (...fns) => (x) =>
  fns.reduceRight((v, f) => f(v), x)

/** Pipe */
export const pipe = (...fns) => (x) =>
  fns.reduce((v, f) => f(v), x)

/** Includes */
export const includes = (v) => (text) =>
  text.search(new RegExp(v, 'i')) > -1

/** Find all */
export const find = (items = []) => (v) =>
  items.filter(includes(v))

/** Find one */
export const findOne = (items = []) => (v) =>
  items.find(includes(v))

/** Update */
export const update = (items = []) => (from, to) =>
  items.map(_change(from, to))

/** Flatten */
export const flatten = (items = []) =>
  items.reduce((v, item) => v.concat(_isArray(item) ? flatten(item) : item), [])

/** Get first item */
export const getFirstItem = (items = []) =>
  [...items].shift()

/** Get last item */
export const getLastItem = (items = []) =>
  [...items].pop()

/** Replace first item */
export const replaceFirst = (items = []) => (data) =>
  [data, ...items.slice(1, 0)]

/** Replace last item */
export const replaceLast = (items = []) => (data) =>
  [...items.slice(0, -1), data]

/** Add item */
export const push = (items = []) => (data, isNew = true) =>
  isNew
    ? [...items, data]
    : replaceLast(items)(data)

/** Remove unnecessary items */
export const diet = (v) =>
  v.filter(isExist)

/** Check difference */
export const isDiff = (a) => (b) =>
  JSON.stringify(a) !== JSON.stringify(b)

/** Pass argument to next function */
export const toss = (key) => (o) =>
  o[key]

/** Functions uses same argument, get results into a array */
export const pass = (...fns) => (x) =>
  fns.reduce((v, f = _noop) => [...v, f(x)], [])

/** Apply same argument to functions */
export const apply = (x) => (...fns) =>
  pass(...fns)(x)

/** To array */
export const toArray = (v) =>
  Array.of(v)

/** Stream */
export const stream = toArray

/** Unique */
export const unique = (v) =>
  Array.from(new Set(v))

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

/** Trace */
export const trace = (label) => (v) => {
  console.log(`${label}: `, v)

  return v
}

/** Is it empty? */
export const isEmpty = (v) => (
  v === null ||
  v === undefined ||
  (v.hasOwnProperty('length') && v.length === 0) ||
  (_isObject(v) && Object.keys(v).length === 0)
)

/** Is it exist? */
export const isExist = (v) =>
  !isEmpty(v)
