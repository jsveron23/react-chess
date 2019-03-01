import { curry } from 'ramda'

/**
 * Create regular expression
 * @param  {string} str
 * @return {RegExp}
 */
function createRegExp (str) {
  return new RegExp(str)
}

/**
 * Create regular expression with options
 * @param  {string} options
 * @param  {string} str
 * @return {RegExp}
 */
function withOption (options, str) {
  return new RegExp(str, options || '')
}

createRegExp.withOptions = curry(withOption)

export default createRegExp
