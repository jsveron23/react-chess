import parseTile from './parseTile'
import transformFileToX from './transformFileToX'
import transformRankToY from './transformRankToY'

/**
 * Transform tile to axis
 * @param  {Object|string} tile
 * @return {Object}
 */
function transformTileToAxis (tile) {
  const { file, rank } = parseTile(tile)
  const x = transformFileToX(file)
  const y = transformRankToY(rank)

  return { x, y }
}

export default transformTileToAxis
