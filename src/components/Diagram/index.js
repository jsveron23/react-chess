import React from 'react'
import PropTypes from 'prop-types'
import { Rank } from '~/components'
import { noop } from '~/utils'
import css from './Diagram.css'

const Diagram = (props) => {
  const {
    isDoingMatch,
    turn,
    snapshot,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    ranks,
    files,
    movableTiles,
    setCapturedNext,
    setMovable,
    setNext
  } = props

  if (!isDoingMatch) {
    return null
  }

  return (
    <div className={css.diagram}>
      {ranks.map((rankName) => {
        return (
          <Rank
            key={rankName}
            turn={turn}
            snapshot={snapshot}
            selectedPiece={selectedPiece}
            selectedSide={selectedSide}
            selectedFile={selectedFile}
            selectedRank={selectedRank}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            setCapturedNext={setCapturedNext}
            setMovable={setMovable}
            setNext={setNext}
          />
        )
      })}
    </div>
  )
}

Diagram.propTypes = {
  isDoingMatch: PropTypes.bool.isRequired,
  turn: PropTypes.string.isRequired,
  ranks: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  snapshot: PropTypes.array.isRequired,
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  movableTiles: PropTypes.array,
  setCapturedNext: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

Diagram.defaultProps = {
  setCapturedNext: noop,
  setMovable: noop,
  setNext: noop
}

export default Diagram
