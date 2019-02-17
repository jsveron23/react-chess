import { curry } from 'ramda'
import { isExist } from '~/utils'

/**
 * @param  {Object}   names
 * @param  {Object}   v
 * @return {Function}
 */
export const _createReduceCb = curry(function _createReduceCb (names, v) {
  /**
   * @callback
   * @param  {Object} acc
   * @param  {string} key
   * @return {Object}
   */
  return (acc, key) => {
    const replaceName = names[key]
    const originalVal = v[key]

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
})
