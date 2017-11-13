import React, { Component } from 'react'
import css from './pawn.css'

const SVG = {
  w: [225, 0, 45, 45],
  b: [225, 45, 45, 45]
}

/**
 * Pawn component
 * @extends {React.Component}
 */
class Pawn extends Component {
  render () {
    const { side } = this.props
    const viewBox = SVG[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="Pawn"
        className={css.pawn}
      />
    )
  }
}

export default Pawn
