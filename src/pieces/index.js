import Pawn from './Pawn'
import Rook from './Rook'
import Bishop from './Bishop'
import Knight from './Knight'
import Queen from './Queen'
import King from './King'

/**
 * @param  {String}          alias
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

export { Pawn, Rook, Bishop, Knight, Queen, King }
