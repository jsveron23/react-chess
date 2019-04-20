import * as R from 'ramda'
import parseTile from './parseTile'
import convertFileToX from './convertFileToX'
import convertRankToY from './convertRankToY'

/**
 * Convert tile to axis
 * @param  {String} tile
 * @return {Object}
 */
function convertTileToAxis (tile) {
  return R.compose(
    ({ file, rank }) => {
      return {
        x: convertFileToX(file),
        y: convertRankToY(rank)
      }
    },
    parseTile
  )(tile)
}

export default convertTileToAxis
