import React from 'react'
import PropTypes from 'prop-types'
import css from './pawn.css'

const SVG = {
  w: [225, 0, 45, 45],
  b: [225, 45, 45, 45]
}

/**
 * Pawn component
 * @param {Object} props
 */
const Pawn = ({ side }) => {
  const viewBox = SVG[side]

  return (
    <img
      src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
      alt="Pawn"
      className={css.pawn}
    />
  )
}

Pawn.propTypes = {
  side: PropTypes.string.isRequired
}

export default Pawn
