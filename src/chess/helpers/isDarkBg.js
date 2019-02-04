import { isEven } from '~/utils'
import parseTileName from './parseTileName'
import transformRank from './transformRank'
import { EVEN_TILES, ODD_TILES } from '~/chess/constants'

/**
 * Is dark background?
 * @param  {string}  tile
 * @return {boolean}
 */
function isDarkBg (tile) {
  const { file, rank } = parseTileName(tile)
  const rankNum = transformRank(rank)
  const dividedTile = isEven(rankNum) ? EVEN_TILES : ODD_TILES

  return dividedTile.includes(file)
}

export default isDarkBg
