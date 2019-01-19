import { isExist } from './is'

/**
 * @module utils/generic
 * =====================
 */

export const flatten = (items = []) => {
  return items.reduce((v, item) => {
    return v.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

export const getFirst = (items = []) => {
  return [...items].shift()
}

export const getLast = (items = []) => {
  return [...items].pop()
}

export const diet = (items = []) => {
  return items.filter((item) => isExist(item))
}

/**
 * @param  {...Array} [...x]
 * @return {Array}
 */
export const toArray = (...x) => {
  return Array.of(...x)
}

/**
 * @alias toArray
 */
export const stream = toArray

/**
 * Multiple arguments
 * ==================
 */

export const replaceFirst = (items = []) => (x) => {
  return [x, ...items.slice(1)]
}

export const replaceLast = (items = []) => (x) => {
  return [...items.slice(0, -1), x]
}

/**
 * Get intersect props between 2 arrays
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const intersection = (a) => (b) => {
  if (typeof a !== typeof b) {
    return []
  }

  const aSet = new Set(Array.isArray(a) ? a : toArray(a))
  const bSet = new Set(Array.isArray(b) ? b : toArray(b))
  const filtered = new Set([...aSet].filter((x) => bSet.has(x)))

  return Array.from(filtered)
}

/**
 * Get difference props between 2 objects
 * @see {@link https://stackoverflow.com/a/37396358/3216812}
 */
export const diffObj = (a = {}) => (b = {}) => {
  return Object.keys(b).reduce((acc, key) => {
    const bVal = b[key]

    if (a[key] === bVal) {
      return acc
    }

    return {
      ...acc,
      [key]: bVal
    }
  }, {})
}

/**
 * Get difference props between 2 arrays
 * @see {@link http://2ality.com/2015/01/es6-set-operations.html}
 */
export const diffArr = (a = []) => (b = []) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const filtered = new Set([...aSet].filter((x) => !bSet.has(x)))

  return Array.from(filtered)
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
