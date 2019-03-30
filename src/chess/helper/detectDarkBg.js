import { isEven } from '~/utils'
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
  const y = convertRankToY(rank)
  const tiles = isEven(y) ? DARK_TILES : LIGHT_TILES

  return tiles.includes(file)
}

export default detectDarkBg
