/**
 * Is it empty?
 * @param  {*}       v
 * @return {boolean}
 */
export const isEmpty = (...x) => {
  const _isEmpty = (v) => (
    v === null ||
    v === undefined ||
    (v.hasOwnProperty('length') && v.length === 0) ||
    (v.constructor === Object && Object.keys(v).length === 0)
  )

  return x.every(_isEmpty)
}

/**
 * Is it exist?
 * @param  {*}       x
 * @return {boolean}
 */
export const isExist = (...x) => !isEmpty(...x)

/**
 * Is it difference?
 * @param  {*}       a
 * @param  {*}       b
 * @return {boolean}
 */
export const isDiff = (a) => (b) => JSON.stringify(a) !== JSON.stringify(b)

/**
 * Is text in there?
 * @param  {string} s
 * @param  {string} text
 * @return {string}
 */
export const isWith = (s) => (text) => text.search(new RegExp(s, 'i')) > -1

/**
 * Is it object?
 * @param  {*}       v
 * @return {boolean}
 */
export const isObject = (...x) => {
  const _isObject = (v) => isExist(v) && v.constructor === Object

  return x.every(_isObject)
}

/**
 * Is it array?
 * @param  {*}       v
 * @return {boolean}
 */
export const isArray = (...x) => {
  const _isArray = (v) => Array.isArray(v)

  return x.every(_isArray)
}
