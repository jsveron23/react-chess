import { ifElse, includes, compose } from 'ramda'
import { isEven, lazy } from '~/utils'
import { parseTile, convertRankToY } from '~/chess/helpers'
import { DARK_TILES, LIGHT_TILES } from '~/chess/constants'

/**
 * Is dark background?
 * @param  {string}  tile
 * @return {boolean}
 */
function isDarkBg (tile) {
  const { file, rank } = parseTile(tile)

  return compose(
    includes(file),
    ifElse(isEven, lazy(DARK_TILES), lazy(LIGHT_TILES)),
    convertRankToY
  )(rank)
}

export default isDarkBg
