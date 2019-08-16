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

  return {
    x: convertFileToX(file),
    y: convertRankToY(rank)
  }
}

export default convertTileToAxis
