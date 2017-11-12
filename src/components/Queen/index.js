import React from 'react'
import css from './queen.css'

/**
 * @type {Object}
 * @readonly
 */
const QUEEN = {
  w: [45, 0, 45, 45],
  b: [45, 45, 45, 45]
}

const Queen = ({ side }) => (
  <img src={`svg/Chess_Pieces.svg#svgView(viewBox(${QUEEN[side]}))`} alt="Queen" className={css.queen} />
)

export default Queen
