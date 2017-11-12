import React from 'react'
import css from './bishop.css'

/**
 * @type {Object}
 * @readonly
 */
const BISHOP = {
  w: [90, 0, 45, 45],
  b: [90, 45, 45, 45]
}

const Bishop = ({ side }) => (
  <img src={`svg/Chess_Pieces.svg#svgView(viewBox(${BISHOP[side]}))`} alt="Bishop" className={css.bishop} />
)

export default Bishop
