import React from 'react'
import css from './knight.css'

/**
 * @type {Object}
 * @readonly
 */
const KNIGHT = {
  w: [135, 0, 45, 45],
  b: [135, 45, 45, 45]
}

const Knight = ({ side }) => (
  <img src={`svg/Chess_Pieces.svg#svgView(viewBox(${KNIGHT[side]}))`} alt="knight" className={css.knight} />
)

export default Knight
