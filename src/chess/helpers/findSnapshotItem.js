import { curry, find, includes } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a snapshot item
 * @param  {string} textToken
 * @param  {Array}  snapshot
 * @return {string}
 */
function findSnapshotItem (textToken, snapshot) {
  if (isEmpty(textToken)) {
    return ''
  }

  const fn = includes(textToken)
  const snapshotItem = find(fn, snapshot)

  return snapshotItem || ''
}

export default curry(findSnapshotItem)
