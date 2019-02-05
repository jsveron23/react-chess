import { curry, keys, compose, reduce } from 'ramda'
import { isExist } from '~/utils'

/**
 * Convert object keys (compose)
 * @param  {Object} names
 * @param  {Object} x
 * @return {Object}
 */
function convertKeys (names, x) {
  const _reduceFn = (acc, key) => {
    const replaceName = names[key]
    const originalVal = x[key]

    if (isExist(replaceName)) {
      return {
        ...acc,
        [replaceName]: originalVal
      }
    }

    return {
      ...acc,
      [key]: originalVal
    }
  }

  return compose(
    reduce(_reduceFn, {}),
    keys
  )(x)
}

export default curry(convertKeys)
