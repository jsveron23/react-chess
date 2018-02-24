import {
  isExist,
  isArray,
  isWith
} from '@utils/is'

/**
 * Find all
 * @param  {Array}  [items=[]]
 * @param  {string} v
 * @return {Array}
 */
export const find = (items = []) => (v) => items.filter(isWith(v))

/**
 * Find one
 * @param  {Array}  [items=[]]
 * @param  {string} v
 * @return {*}
 */
export const findOne = (items = []) => (v) => items.find(isWith(v))

/**
 * Update
 * @param  {Array} [items=[]]
 * @param  {*}     from
 * @param  {*}     to
 * @return {Array}
 */
export const update = (items = []) => (from) => (to) =>
  items.map((item) => item === from ? to : item)

/**
 * Flatten
 * @param  {Array} [items=[]]
 * @return {Array}
 */
export const flatten = (items = []) =>
  items.reduce((v, item) => v.concat(isArray(item) ? flatten(item) : item), [])

/**
 * Get first item
 * @param  {Array} [items=[]]
 * @return {*}
 */
export const getFirstItem = (items = []) => [...items].shift()

/**
 * Get last item
 * @param  {Array} [items=[]]
 * @return {*}
 */
export const getLastItem = (items = []) => [...items].pop()

/**
 * Replace first item
 * @param  {Array} [items=[]]
 * @param  {*}     x
 * @return {Array}
 */
export const replaceFirst = (items = []) => (x) =>
  [x, ...items.slice(1, 0)]

/**
 * Replace last item
 * @param  {Array} [items=[]]
 * @param  {*}     x
 * @return {Array}
 */
export const replaceLast = (items = []) => (x) =>
  [...items.slice(0, -1), x]

/**
 * Add item
 * @param  {Array} [items=[]]
 * @param  {*}     x
 * @param  {Array} [isNew=true]
 * @return {Array}
 */
export const push = (items = []) => (x, isNew = true) => isNew
  ? [...items, x]
  : replaceLast(items)(x)

/**
 * Remove unnecessary items
 * @param  {Array} v
 * @return {Array}
 * @NOTE
 * - isExist function should be took single arg
 */
export const diet = (v) => v.filter((item) => isExist(item))

/**
 * To array
 * @param  {*}     x
 * @return {Array}
 */
export const toArray = (x) => Array.of(x)

/**
 * @alias toArray
 */
export const stream = toArray

/**
 * Unique
 * @param  {*}     x
 * @return {Array}
 */
export const unique = (x) => Array.from(new Set(x))

/**
 * Intersection
 * @param  {*}     a
 * @param  {*}     b
 * @return {Array}
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const intersection = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filtered = new Set([...aSet].filter(x => bSet.has(x)))

  return Array.from(filtered)
}

/**
 * Difference
 * @param  {*}     a
 * @param  {*}     b
 * @return {Array}
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const diff = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filtered = new Set([...aSet].filter(x => !bSet.has(x)))

  return Array.from(filtered)
}

/**
 * Union
 * @param  {*}     a
 * @param  {*}     b
 * @return {Array}
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const union = (a) => (b) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const set = new Set([...aSet, ...bSet])

  return Array.from(set)
}
