import * as R from 'ramda'
import { isExist } from '~/utils'
import _isKingMoved from './_isKingMoved'
import _isLeftRookMoved from './_isLeftRookMoved'
import _isRightRookMoved from './_isRightRookMoved'
import convertTileToAxis from '../../helpers/convertTileToAxis'
import parseCode from '../../helpers/parseCode'

const IGNORE_TILES = ['b1', 'd8']

function _applyCastling (side, checkBy, timeline) {
  const isKingMoved = _isKingMoved(timeline, side)
  const isLeftRookMoved = _isLeftRookMoved(timeline, side)
  const isRightRookMoved = _isRightRookMoved(timeline, side)
  const isCheck = R.ifElse(
    isExist,
    R.compose(
      R.not,
      R.equals(side),
      R.prop('side'),
      parseCode
    ),
    R.F
  )(checkBy)

  if (!isCheck && !isKingMoved) {
    const [snapshot] = timeline
    let checkPath = []

    if (!isLeftRookMoved) {
      checkPath = side === 'w' ? ['b1', 'c1', 'd1'] : ['f8', 'g8']
    }

    if (!isRightRookMoved) {
      checkPath = checkPath.concat(
        side === 'w' ? ['f1', 'g1'] : ['b8', 'c8', 'd8']
      )
    }

    const ableToMove = snapshot.some((code) => !checkPath.includes(code))

    if (ableToMove) {
      return checkPath.reduce((acc, pathTile) => {
        if (IGNORE_TILES.includes(pathTile)) {
          return acc
        }

        const { x, y } = convertTileToAxis(pathTile)

        return [...acc, [x, y]]
      }, [])
    }
  }

  return []
}

export default R.curry(_applyCastling)
