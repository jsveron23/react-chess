import * as R from 'ramda'
import getCodeChanges from './getCodeChanges'
import { convertCodeToTile, convertTileToAxis } from '../helpers'

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
  const { x: nextX, y: nextY } = convertTileToAxis(nextTile)

  const prevTile = convertCodeToTile(prevCode)
  const { x: prevX, y: prevY } = convertTileToAxis(prevTile)

  return {
    left: (prevX - nextX) * width,
    top: (nextY - prevY) * width,
    tile: nextTile
  }
}

export default R.curry(mesurePosition)
