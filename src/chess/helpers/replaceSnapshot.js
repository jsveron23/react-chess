import * as R from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Replace code of snapshot
 * @param  {String} replace
 * @param  {String} token
 * @param  {Array}  snapshot
 * @return {Array}
 */
function replaceSnapshot (replace, token, snapshot) {
  if (isEmpty(token)) {
    return snapshot
  }

  return snapshot.map((code) => {
    return code.includes(token) ? replace : code
  })
}

export default R.curry(replaceSnapshot)
