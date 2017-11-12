import React from 'react'
import css from './king.css'

/**
 * @type {Object}
 * @readonly
 */
const KING = {
  w: [0, 0, 45, 45],
  b: [0, 45, 45, 45]
}

/**
 * King component
 * @param {Object} props
 */
const King = ({ side }) => (
  <img src={`svg/Chess_Pieces.svg#svgView(viewBox(${KING[side]}))`} alt="King" className={css.king} />
)

export default King
