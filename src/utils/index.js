import { curry } from 'ramda'
import { isEmptyFn, isExistFn } from './internal/custom'

/**
 * Is empty?
 * @param  {...*}    [...x]
 * @return {boolean}
 */
export const isEmpty = isEmptyFn('every')
isEmpty.or = isEmptyFn('some')

/**
 * Is exist?
 * @param  {...*}    [...x]
 * @return {boolean}
 */
export const isExist = isExistFn('every')
isExist.or = isExistFn('some')

/**
 * Is even?
 * @param  {number}  v
 * @return {boolean}
 */
export const isEven = (v) => v % 2 === 0

/**
 * Extract value from object (compose)
 * @param  {string} keyName
 * @return {Object}
 */
export const extract = curry((keyName, obj) => {
  const nextObj = { ...obj }

  return nextObj[keyName]
})

/**
 * Trace log (compose)
 * @param  {string} label
 * @return {*}
 */
export const trace = curry((label, v) => {
  console.log(`${label}: `, v)

  return v
})

/**
 * Empty function
 * @return {undefined}
 */
export const noop = function () {}

// export const destructByNames = (...names) => (v) => {
//   const mappable = split('', v)
//
//   return mappable.reduce((acc, splited, idx) => {
//     const name = names[idx]
//
//     if (isEmpty(name)) {
//       return acc
//     }
//
//     return {
//       ...acc,
//       [name]: splited
//     }
//   }, {})
// }
