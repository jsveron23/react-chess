import * as R from 'ramda'
import isEmpty from './isEmpty'

/**
 * @param  {Array}    names
 * @return {Function}
 */
function createReduceCb (names) {
  let idx = 0

  /**
   * @callback
   * @param  {Object} acc
   * @param  {*}      chunk
   * @return {Object}
   */
  return (acc, chunk) => {
    const name = names[idx]
    const isValidType = typeof name === 'string' || typeof name === 'number'

    idx += 1

    if (!isValidType || isEmpty(name)) {
      return acc
    }

    return {
      ...acc,
      [name]: chunk
    }
  }
}

/**
 * Split by token string and return as an object
 * @param  {String} token
 * @param  {Array}  names
 * @param  {String} str
 * @return {Object}
 */
function splitTo (token, names, str) {
  const reduceCb = createReduceCb(names)

  return R.compose(
    R.reduce(reduceCb, {}),
    R.split(token)
  )(str)
}

export default R.curry(splitTo)
