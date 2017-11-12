import React from 'react'
import css from './pawn.css'

const Init = {
  w: [225, 0, 45, 45],
  b: [225, 45, 45, 45]
}

const Pawn = ({ side }) => {
  const viewBox = Init[side]

  return (
    <img
      src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
      alt="Pawn"
      className={css.pawn}
    />
  )
}

export default Pawn
