import * as R from 'ramda'
import isEmpty from './isEmpty'

/**
 * Split by token string and return as an object
 * @param  {string} token
 * @param  {Array}  names
 * @param  {string} str
 * @return {Object}
 */
function splitTo (token, names, str) {
  const mappable = R.split(token, str)

  return mappable.reduce((acc, chunk, idx) => {
    const name = names[idx]
    const isValidType = typeof name === 'string' || typeof name === 'number'

    if (!isValidType || isEmpty(name)) {
      return acc
    }

    return {
      ...acc,
      [name]: chunk
    }
  }, {})
}

export default R.curry(splitTo)
