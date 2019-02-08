import { curry } from 'ramda'

/**
 * Extract value from object/array (compose)
 * @param  {string|number} keyName
 * @return {Object|Array}
 */
function extract (keyName, x) {
  return x[keyName]
}

export default curry(extract)
