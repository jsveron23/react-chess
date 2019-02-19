import { curry, split } from 'ramda'
import isEmpty from './isEmpty'

/**
 * Split by token string and return as an object
 * @param  {string} token
 * @param  {Array}  names
 * @param  {string} txt
 * @return {Object}
 */
function splitTo (token, names, txt) {
  const mappable = split(token, txt)

  // NOTE: Ramda#reduce will not return index number
  return mappable.reduce((acc, chunk, idx) => {
    const name = names[idx]
    const validType = typeof name === 'string' || typeof name === 'number'

    if (!validType || isEmpty(name)) {
      return acc
    }

    return {
      ...acc,
      [name]: chunk
    }
  }, {})
}

export default curry(splitTo)
