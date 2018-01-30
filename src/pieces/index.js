import Pawn from './Pawn'
import Rook from './Rook'
import Bishop from './Bishop'
import Knight from './Knight'
import Queen from './Queen'
import King from './King'

/**
 * Get piece
 * @return {React.Component}
 */
export function getPiece (alias) {
  const list = {
    P: Pawn,
    R: Rook,
    B: Bishop,
    N: Knight,
    Q: Queen,
    K: King
  }

  return list[alias]
}

/**
 * Get defaults movement
 * @return {Array}
 * @see @utils/Chess/index.js#isCheck
 */
export function getDefaults (alias) {
  const { movement } = getPiece(alias)
  const { defaults } = movement

  return defaults
}

export { Pawn, Rook, Bishop, Knight, Queen, King }
