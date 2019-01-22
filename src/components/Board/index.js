import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import css from './Board.css'

const Board = ({ isMatching, turn, notations, ranks, files }) => {
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
            files={files}
            rankName={rankName}
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
  files: PropTypes.array.isRequired
}

export default Board
