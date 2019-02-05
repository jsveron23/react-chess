import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import { noop } from '~/utils'
import css from './Board.css'

const Board = ({
  isMatching,
  turn,
  lineup,
  selected,
  ranks,
  files,
  movableTiles,
  setSelected,
  setMovableTiles,
  drawLineup,
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
            lineup={lineup}
            selected={selected}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            setSelected={setSelected}
            setMovableTiles={setMovableTiles}
            drawLineup={drawLineup}
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
  drawLineup: PropTypes.func,
  toggleTurn: PropTypes.func
}

Board.defaultProps = {
  setSelected: noop,
  setMovableTiles: noop,
  drawLineup: noop,
  toggleTurn: noop
}

export default Board
