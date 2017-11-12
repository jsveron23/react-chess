import React from 'react'
import css from './rook.css'

/**
 * @type {Object}
 * @readonly
 */
const ROOK = {
  w: [180, 0, 45, 45],
  b: [180, 45, 45, 45]
}

const Rook = ({ side }) => (
  <img src={`svg/Chess_Pieces.svg#svgView(viewBox(${ROOK[side]}))`} alt="Rook" className={css.rook} />
)

export default Rook
