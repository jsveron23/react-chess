import { curry } from 'ramda'

/**
 * Extract value from object (compose)
 * @param  {string} keyName
 * @return {Object}
 */
function extract (keyName, obj) {
  return obj[keyName]
}

export default curry(extract)
