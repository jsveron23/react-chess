import { curry, includes } from 'ramda'

/**
 * Replace code of snapshot
 * @param  {string} replace
 * @param  {string} token
 * @param  {Array}  snapshot
 * @return {Array}
 */
function replaceSnapshot (replace, token, snapshot) {
  return snapshot.map((code) => {
    if (includes(token, code)) {
      return replace
    }

    return code
  })
}

export default curry(replaceSnapshot)
