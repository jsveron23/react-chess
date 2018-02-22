/**
 * Is it empty?
 * @param  {*}       v
 * @return {boolean}
 */
const _isEmpty = (v) => (
  v === null ||
  v === undefined ||
  (v.hasOwnProperty('length') && v.length === 0) ||
  (_isObject(v) && Object.keys(v).length === 0)
)

export const isEmpty = (...x) => x.every(_isEmpty)

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
export const includes = (s) => (text) => text.search(new RegExp(s, 'i')) > -1

/**
 * Is it object?
 * @param  {*}       v
 * @return {boolean}
 */
const _isObject = (v) => v.constructor === Object

export const isObject = (...x) => x.every(_isObject)

/**
 * Is it array?
 * @param  {*}       v
 * @return {boolean}
 */
const _isArray = (v) => Array.isArray(v)

export const isArray = (...x) => x.every(_isArray)
