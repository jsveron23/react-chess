import React, { Component } from 'react'
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

function enhancePiece (WrappedComponent, key) {
  class Piece extends Component {
    render () {
      return <WrappedComponent />
    }
  }

  Piece.displayName = `enhancePiece(${key})`

  return Piece
}

const getPiece = ({ color, piece }) => {
  const pieceList = {
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

  const enhancedPieceList = Object.keys(pieceList).reduce((acc, key) => {
    const Component = pieceList[key]

    return {
      ...acc,
      [key]: enhancePiece(Component, key)
    }
  }, {})

  return enhancedPieceList[`${color}${piece}`]
}

export default getPiece
