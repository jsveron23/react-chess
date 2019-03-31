import * as R from 'ramda'
import { getCodeChanges, convertCodeToTile, convertTileToAxis } from '../helper'

/**
 * Mesure position to be animated
 * TODO:
 * - get width dynamically
 * - sometimes miss-calculated (like Knight case)
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
    tile: nextTile,
    // prevTile,
    // prevLeft: (prevX - nextX) * width,
    left: (prevX - nextX) * width,
    // prevTop: (prevY - nextY) * width,
    top: (nextY - prevY) * width
  }
}

export default R.curry(mesurePosition)
