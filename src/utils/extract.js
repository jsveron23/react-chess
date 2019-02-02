import { curry } from 'ramda'

/**
 * Extract value from object (compose)
 * @param  {string} keyName
 * @return {Object}
 */
const extract = (keyName, obj) => obj[keyName]

export default curry(extract)
