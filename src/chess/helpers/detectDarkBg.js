import * as R from 'ramda'
import { isEven, lazy } from '~/utils'
import parseTile from './parseTile'
import convertRankToY from './convertRankToY'
import { DARK_TILES, LIGHT_TILES } from '../constants'

/**
 * Detect dark background?
 * @param  {String}  tile
 * @return {Boolean}
 */
function detectDarkBg (tile) {
  const { file, rank } = parseTile(tile)

  return R.compose(
    R.includes(file),
    R.ifElse(isEven, lazy(DARK_TILES), lazy(LIGHT_TILES)),
    convertRankToY
  )(rank)
}

export default detectDarkBg
