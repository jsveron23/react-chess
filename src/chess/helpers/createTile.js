import * as R from 'ramda'
import { isEmpty } from '~/utils'

/**
 * Create tile
 * @param  {String} file
 * @param  {String} rank
 * @return {String}
 */
function createTile (file, rank) {
  if (isEmpty.or(file, rank)) {
    throw new Error('Empty string!')
  }

  return `${file}${rank}`
}

export default R.curry(createTile)
