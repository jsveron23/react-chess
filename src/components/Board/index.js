import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import { noop } from '~/utils'
import css from './Board.css'

const Board = (props) => {
  const {
    isMatching,
    turn,
    lineup,
    selected,
    ranks,
    files,
    movableTiles,
    setSelected,
    setMovableTiles,
    setLineup,
    toggleTurn
  } = props

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
            lineup={lineup}
            selected={selected}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            setSelected={setSelected}
            setMovableTiles={setMovableTiles}
            setLineup={setLineup}
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
  lineup: PropTypes.array.isRequired,
  selected: PropTypes.string,
  movableTiles: PropTypes.array,
  setSelected: PropTypes.func,
  setMovableTiles: PropTypes.func,
  setLineup: PropTypes.func,
  toggleTurn: PropTypes.func
}

Board.defaultProps = {
  setSelected: noop,
  setMovableTiles: noop,
  setLineup: noop,
  toggleTurn: noop
}

export default Board
