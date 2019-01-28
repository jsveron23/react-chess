import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import { noop } from '~/utils'
import css from './Board.css'

const Board = ({
  isMatching,
  turn,
  notations,
  selected,
  ranks,
  files,
  movableTiles,
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
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
            movableTiles={movableTiles}
            selectPiece={selectPiece}
            setCurrentMovable={setCurrentMovable}
            setNotations={setNotations}
            toggleTurn={toggleTurn}
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
  selected: PropTypes.string,
  movableTiles: PropTypes.array,
  selectPiece: PropTypes.func,
  setCurrentMovable: PropTypes.func,
  setNotations: PropTypes.func,
  toggleTurn: PropTypes.func
}

Board.defaultProps = {
  selectPiece: noop,
  setCurrentMovable: noop,
  setNotations: noop,
  toggleTurn: noop
}

export default Board
