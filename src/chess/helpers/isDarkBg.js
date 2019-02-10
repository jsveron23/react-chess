import { isEven } from '~/utils'
import parseTile from './parseTile'
import transformRankToY from './transformRankToY'
import { EVEN_TILES, ODD_TILES } from '~/chess/constants'

/**
 * Is dark background?
 * @param  {string}  tile
 * @return {boolean}
 */
function isDarkBg (tile) {
  const { file, rank } = parseTile(tile)
  const y = transformRankToY(rank)
  const dividedTile = isEven(y) ? EVEN_TILES : ODD_TILES

  return dividedTile.includes(file)
}

export default isDarkBg
