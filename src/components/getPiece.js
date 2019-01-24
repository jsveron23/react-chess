import BlackBishop from '~/assets/pieces/black_bishop.svg'
import BlackKing from '~/assets/pieces/black_king.svg'
import BlackKnight from '~/assets/pieces/black_knight.svg'
import BlackPawn from '~/assets/pieces/black_pawn.svg'
import BlackQueen from '~/assets/pieces/black_queen.svg'
import BlackRook from '~/assets/pieces/black_rook.svg'
import WhiteBishop from '~/assets/pieces/white_bishop.svg'
import WhiteKing from '~/assets/pieces/white_king.svg'
import WhiteKnight from '~/assets/pieces/white_knight.svg'
import WhitePawn from '~/assets/pieces/white_pawn.svg'
import WhiteQueen from '~/assets/pieces/white_queen.svg'
import WhiteRook from '~/assets/pieces/white_rook.svg'
import enhancePiece from '~/components/enhancePiece'
import { isEmpty } from '~/utils'

const PIECE_MAP = {
  bB: BlackBishop,
  bK: BlackKing,
  bN: BlackKnight,
  bP: BlackPawn,
  bQ: BlackQueen,
  bR: BlackRook,
  wB: WhiteBishop,
  wK: WhiteKing,
  wN: WhiteKnight,
  wP: WhitePawn,
  wQ: WhiteQueen,
  wR: WhiteRook
}

function createEnhancedMap (map) {
  return Object.keys(map).reduce((acc, key) => {
    const Component = map[key]
    const sideKey = key.slice(0, 1)

    if (isEmpty(Component)) {
      return acc
    }

    return {
      ...acc,
      [key]: enhancePiece(Component, sideKey)
    }
  }, {})
}

function getPiece ({ color, piece, map = PIECE_MAP } = {}) {
  const enhancedMap = createEnhancedMap(map)

  return enhancedMap[`${color}${piece}`]
}

export default getPiece
export {
  BlackBishop,
  BlackKing,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook
}
