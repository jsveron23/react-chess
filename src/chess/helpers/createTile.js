import { curry } from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Create tile
 * @param  {string} file
 * @param  {string} rank
 * @return {string}
 */
function createTile (file, rank) {
  if (isEmpty.or(file, rank)) {
    return ''
  }

  return `${file}${rank}`
}

export default curry(createTile)
