import * as R from 'ramda'
import getCodeChanges from './getCodeChanges'
import { parseCode, convertTileToAxis } from '../helpers'

const convertCodeToTile = R.compose(
  R.prop('tile'),
  parseCode
)

/**
 * Mesure position to be animated
 * @param  {Array}  snapshot
 * @param  {Array}  prevSnapshot
 * @param  {Number} width
 * @return {Object}
 */
function mesurePosition (snapshot, prevSnapshot, width) {
  const { nextCode, prevCode } = getCodeChanges(snapshot, prevSnapshot)
  const nextTile = convertCodeToTile(nextCode)
  const prevTile = convertCodeToTile(prevCode)
  const { x: nextX, y: nextY } = convertTileToAxis(nextTile)
  const { x: prevX, y: prevY } = convertTileToAxis(prevTile)

  return {
    left: (prevX - nextX) * width,
    top: (nextY - prevY) * width,
    tile: nextTile
  }
}

export default R.curry(mesurePosition)
