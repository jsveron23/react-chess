import { curry } from 'ramda'

/**
 * Create RegExp
 * @param  {string} text
 * @return {RegExp}
 */
function createRegExp (text) {
  return new RegExp(text)
}

createRegExp.withOptions = curry((options, text) => {
  return new RegExp(text, options || '')
})

export default createRegExp
