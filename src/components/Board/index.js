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
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    ranks,
    files,
    movableTiles,
    setLineup,
    setMovable,
    setNext
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
            selectedPiece={selectedPiece}
            selectedSide={selectedSide}
            selectedFile={selectedFile}
            selectedRank={selectedRank}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            setLineup={setLineup}
            setMovable={setMovable}
            setNext={setNext}
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
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  movableTiles: PropTypes.array,
  setLineup: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

Board.defaultProps = {
  setLineup: noop,
  setMovable: noop,
  setNext: noop
}

export default Board
