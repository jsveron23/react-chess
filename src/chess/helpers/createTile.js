import * as R from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Create a tile
 * @param  {String} file
 * @param  {String} rank
 * @return {String}
 */
function createTile (file, rank) {
  if (isEmpty.or(file, rank)) {
    return ''
  }

  return `${file}${rank}`
}

export default R.curry(createTile)
