import { curry } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Replace code of snapshot
 * @param  {string} replace
 * @param  {string} token
 * @param  {Array}  snapshot
 * @return {Array}
 */
function replaceSnapshot (replace, token, snapshot) {
  if (isEmpty(token)) {
    return snapshot
  }

  return snapshot.map((code) => {
    if (code.includes(token)) {
      return replace
    }

    return code
  })
}

export default curry(replaceSnapshot)
