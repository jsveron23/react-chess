import { compose } from 'ramda'
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
} from '~/chess/components'
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

function getEnhancedMap (map) {
  const streamMap = Object.keys(map)

  return streamMap.reduce((acc, key) => {
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

function getPiece (map) {
  return ({ color, piece }) => map[`${color}${piece}`]
}

const getEnhancedPiece = compose(
  getPiece,
  getEnhancedMap
)(PIECE_MAP)

export default getEnhancedPiece
