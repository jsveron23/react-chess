import * as R from 'ramda'
import { isEmpty, lazy } from '~/utils'

const notIncludes = R.complement(R.includes)

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

  const mapCb = R.unless(notIncludes(token), lazy(replace))

  return snapshot.map(mapCb)
}

export default R.curry(replaceSnapshot)
