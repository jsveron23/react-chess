import { curry, split } from 'ramda'
import isEmpty from './isEmpty'

/**
 * Split string but return as object
 * @param  {Array}  names
 * @param  {*}      v
 * @return {Object}
 */
function splitTo (names, v) {
  const mappable = split('', v)

  // NOTE: Ramda#reduce will not return index number
  return mappable.reduce((acc, char, idx) => {
    const name = names[idx]

    if (isEmpty(name)) {
      return acc
    }

    return {
      ...acc,
      [name]: char
    }
  }, {})
}

export default curry(splitTo)
