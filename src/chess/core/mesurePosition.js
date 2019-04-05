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
  const top = (nextY - prevY) * width
  const left = (prevX - nextX) * width

  return {
    left,
    top,
    tile: nextTile
  }
}

export default R.curry(mesurePosition)
