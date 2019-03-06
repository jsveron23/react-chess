import parseTile from './parseTile'
import convertFileToX from './convertFileToX'
import convertRankToY from './convertRankToY'

/**
 * Convert tile to axis
 * @param  {String} tile
 * @return {Object}
 */
function convertTileToAxis (tile) {
  const { file, rank } = parseTile(tile)
  const x = convertFileToX(file)
  const y = convertRankToY(rank)

  return { x, y }
}

export default convertTileToAxis
