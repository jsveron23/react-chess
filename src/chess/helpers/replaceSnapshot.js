import * as R from 'ramda'
import { isEmpty, lazy } from '~/utils'

/**
 * Replace code of snapshot
 * @param  {String} replace
 * @param  {String} token
 * @param  {Array}  snapshot
 * @return {Array}
 */
function replaceSnapshot (replace, token, snapshot) {
  const mapCb = R.ifElse(R.includes(token), lazy(replace), R.identity)

  return R.ifElse(isEmpty.lazy(token), R.identity, R.map(mapCb))(snapshot)
}

export default R.curry(replaceSnapshot)
