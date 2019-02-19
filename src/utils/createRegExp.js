import { curry } from 'ramda'

/**
 * Create regular expression
 * @param  {string} txt
 * @return {RegExp}
 */
function createRegExp (txt) {
  return new RegExp(txt)
}

/**
 * Create regular expression with options
 * @param  {string} options
 * @param  {string} txt
 * @return {RegExp}
 */
function withOption (options, txt) {
  return new RegExp(txt, options || '')
}

createRegExp.withOptions = curry(withOption)

export default createRegExp
