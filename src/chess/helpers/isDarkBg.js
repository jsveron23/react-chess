import { includes } from 'ramda'
import { isEven } from '~/utils'
import { DARK_TILES, LIGHT_TILES } from '~/chess/constants'
import parseTile from './parseTile'
import convertRankToY from './convertRankToY'

/**
 * Is dark background?
 * @param  {string}  tile
 * @return {boolean}
 */
function isDarkBg (tile) {
  const { file, rank } = parseTile(tile)
  const y = convertRankToY(rank)
  const dividedTile = isEven(y) ? DARK_TILES : LIGHT_TILES

  return includes(file, dividedTile)
}

export default isDarkBg
