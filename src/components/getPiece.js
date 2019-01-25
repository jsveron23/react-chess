import { memo } from 'react'
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
} from '~/components'
import enhancePiece from '~/components/enhancePiece'
import { isEmpty, compose } from '~/utils'

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

function getEnhancedMap (map) {
  return Object.keys(map).reduce((acc, key) => {
    const Component = map[key]
    const sideKey = key.slice(0, 1)

    if (isEmpty(Component)) {
      return acc
    }

    const EnhancedPiece = compose(
      memo,
      enhancePiece(sideKey)
    )(Component)

    return {
      ...acc,
      [key]: EnhancedPiece
    }
  }, {})
}

function getPiece (map) {
  return ({ color, piece }) => map[`${color}${piece}`]
}

const getEnhancedPiece = compose(
  getPiece,
  getEnhancedMap
)(PIECE_MAP)

export default getEnhancedPiece
