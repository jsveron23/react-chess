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

function getPiece (map) {
  return ({ color, piece }) => {
    const combinedKey = `${color}${piece}`
    const enhancedMap = Object.keys(map).reduce((acc, key) => {
      const Component = map[key]

      return {
        ...acc,
        [key]: enhancePiece(Component, key)
      }
    }, {})

    return enhancedMap[combinedKey]
  }
}

export default getPiece(PIECE_MAP)
