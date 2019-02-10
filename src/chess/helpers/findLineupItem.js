import { curry, find, includes } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Find a lineup item
 * @param  {string} token
 * @param  {Array}  lineup
 * @return {string}
 */
function findLineupItem (textToken, lineup) {
  if (isEmpty(textToken)) {
    return ''
  }

  const fn = includes(textToken)
  const lineupItem = find(fn, lineup)

  return lineupItem || ''
}

export default curry(findLineupItem)
