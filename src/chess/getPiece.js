import * as R from 'ramda'
import {
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
} from './components'
import enhancePiece from './enhancePiece'

const PIECE_MAP = {
  bB: enhancePiece(BlackBishop)('bB', 'b'),
  bK: enhancePiece(BlackKing)('bK', 'b'),
  bN: enhancePiece(BlackKnight)('bN', 'b'),
  bP: enhancePiece(BlackPawn)('bP', 'b'),
  bQ: enhancePiece(BlackQueen)('bQ', 'b'),
  bR: enhancePiece(BlackRook)('bR', 'b'),
  wB: enhancePiece(WhiteBishop)('wB', 'w'),
  wK: enhancePiece(WhiteKing)('wK', 'w'),
  wN: enhancePiece(WhiteKnight)('wN', 'w'),
  wP: enhancePiece(WhitePawn)('wP', 'w'),
  wQ: enhancePiece(WhiteQueen)('wQ', 'w'),
  wR: enhancePiece(WhiteRook)('wR', 'w')
}

function getPiece (side, piece) {
  const pieceKey = `${side}${piece}`

  return PIECE_MAP[pieceKey]
}

export default R.curry(getPiece)
