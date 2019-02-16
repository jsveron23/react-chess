import { curry, includes } from 'ramda'

/**
 * Replace snapshot items of snapshot
 * @param  {string} replace
 * @param  {string} textToken
 * @param  {Array}  snapshot
 * @return {Array}
 */
function replaceSnapshot (replace, textToken, snapshot) {
  return snapshot.map((snapshotItem) => {
    if (includes(textToken, snapshotItem)) {
      return replace
    }

    return snapshotItem
  })
}

export default curry(replaceSnapshot)
