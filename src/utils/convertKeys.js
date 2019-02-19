import { curry, keys, compose, reduce } from 'ramda'
import { isExist } from '~/utils'

/**
 * @param  {Object}   names
 * @param  {Object}   obj
 * @return {Function}
 */
function createReduceCb (names, obj) {
  /**
   * @callback
   * @param  {Object} acc
   * @param  {string} key
   * @return {Object}
   */
  return (acc, key) => {
    const replaceKey = names[key]
    const originalVal = obj[key]

    if (isExist(replaceKey)) {
      return {
        ...acc,
        [replaceKey]: originalVal
      }
    }

    return {
      ...acc,
      [key]: originalVal
    }
  }
}

/**
 * Convert key name inside an object (composable)
 * @param  {Object} names
 * @param  {Object} obj
 * @return {Object}
 */
function convertKeys (names, obj) {
  const reduceCb = createReduceCb(names, obj)

  return compose(
    reduce(reduceCb, {}),
    keys
  )(obj)
}

export default curry(convertKeys)
