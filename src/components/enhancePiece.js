import React, { Component } from 'react'

function enhancePiece (WrappedComponent, key) {
  class Piece extends Component {
    render () {
      return <WrappedComponent />
    }
  }

  Piece.displayName = `enhancePiece(${key})`

  return Piece
}

export default enhancePiece
