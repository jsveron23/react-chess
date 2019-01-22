import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import css from './Board.css'

const Board = ({
  isMatching,
  turn,
  notations,
  selected,
  ranks,
  files,
  selectPiece
}) => {
  if (!isMatching) {
    return null
  }

  return (
    <div className={css.board}>
      {ranks.map((rankName) => {
        return (
          <Rank
            key={rankName}
            turn={turn}
            notations={notations}
            selected={selected}
            files={files}
            rankName={rankName}
            selectPiece={selectPiece}
          />
        )
      })}
    </div>
  )
}

Board.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  turn: PropTypes.string.isRequired,
  ranks: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  selectPiece: PropTypes.func.isRequired,
  selected: PropTypes.string
}

export default Board
