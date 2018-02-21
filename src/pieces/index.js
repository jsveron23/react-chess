import Pawn from './Pawn'
import Rook from './Rook'
import Bishop from './Bishop'
import Knight from './Knight'
import Queen from './Queen'
import King from './King'

export function getPiece (alias) {
  const list = {
    '*': Queen, // get every direction
    P: Pawn,
    R: Rook,
    B: Bishop,
    N: Knight,
    Q: Queen,
    K: King
  }

  return list[alias]
}

export function getDefaults (alias) {
  const { movement } = getPiece(alias)
  const { defaults } = movement

  return defaults
}

export function getSpecials (alias) {
  const { movement } = getPiece(alias)
  const { specials } = movement

  return specials
}

export function getMovement (piece, isStream = true) {
  const defaults = getDefaults(piece)
  const specials = getSpecials(piece)

  return isStream
    ? [defaults, specials]
    : { defaults, specials }
}

export {
  Pawn,
  Rook,
  Bishop,
  Knight,
  Queen,
  King
}
