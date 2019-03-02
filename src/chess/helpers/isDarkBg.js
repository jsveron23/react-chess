import { ifElse, includes, thunkify, identity, compose } from 'ramda'
import { isEven } from '~/utils'
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
    ifElse(
      isEven,
      thunkify(identity)(DARK_TILES),
      thunkify(identity)(LIGHT_TILES)
    ),
    convertRankToY
  )(rank)
}

export default isDarkBg
