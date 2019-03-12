import * as R from 'ramda'

/**
 * Create regular expression
 * @param  {String} str
 * @return {RegExp}
 */
function createRegExp (str) {
  return new RegExp(str)
}

/**
 * Create regular expression with options
 * @param  {String} options
 * @param  {String} str
 * @return {RegExp}
 */
function withOption (options, str) {
  return new RegExp(str, options || '')
}

createRegExp.withOptions = R.curry(withOption)

export default createRegExp
