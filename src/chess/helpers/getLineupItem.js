import { curry } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Get a lineup item that includes token (like tile)
 * @param  {Array}   lineup
 * @param  {string?} token
 * @return {string}
 */
function getLineupItem (lineup, token) {
  if (isEmpty(token)) {
    return ''
  }

  const item = lineup.find((n) => n.includes(token))

  return item || ''
}

export default curry(getLineupItem)
