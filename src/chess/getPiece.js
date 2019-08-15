import * as R from 'ramda'
import { merge } from '~/utils'
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
import svgWrapper from './components/svgWrapper'

const PIECE_MAP = {
  bB: svgWrapper(BlackBishop)('bB', 'b'),
  bK: svgWrapper(BlackKing)('bK', 'b'),
  bN: svgWrapper(BlackKnight)('bN', 'b'),
  bP: svgWrapper(BlackPawn)('bP', 'b'),
  bQ: svgWrapper(BlackQueen)('bQ', 'b'),
  bR: svgWrapper(BlackRook)('bR', 'b'),
  wB: svgWrapper(WhiteBishop)('wB', 'w'),
  wK: svgWrapper(WhiteKing)('wK', 'w'),
  wN: svgWrapper(WhiteKnight)('wN', 'w'),
  wP: svgWrapper(WhitePawn)('wP', 'w'),
  wQ: svgWrapper(WhiteQueen)('wQ', 'w'),
  wR: svgWrapper(WhiteRook)('wR', 'w')
}

function getPiece (side, piece) {
  const pieceKey = merge.txt(side, piece)

  return PIECE_MAP[pieceKey]
}

export default R.curry(getPiece)
