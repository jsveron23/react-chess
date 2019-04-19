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
 * With options
 * @param  {String} options
 * @param  {String} str
 * @return {RegExp}
 */
function withOptions (options, str) {
  return new RegExp(str, options || '')
}

createRegExp.withOptions = R.curry(withOptions)

export default createRegExp
