import { curry, split } from 'ramda'
import isEmpty from './isEmpty'

/**
 * Split string but return as object
 * @param  {Array}  names
 * @param  {*}      x
 * @return {Object}
 */
function splitTo (names, x) {
  const mappable = split('', x)

  // NOTE: Ramda#reduce will not return index number
  return mappable.reduce((acc, v, idx) => {
    const name = names[idx]
    const validType = typeof name === 'string' || typeof name === 'number'

    if (!validType || isEmpty(name)) {
      return acc
    }

    return {
      ...acc,
      [name]: v
    }
  }, {})
}

export default curry(splitTo)
