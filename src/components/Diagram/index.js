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
    checkTo,
    ranks,
    files,
    movableTiles,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
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
            checkTo={checkTo}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            setNextCapturedSnapshot={setNextCapturedSnapshot}
            setNextMovableAxis={setNextMovableAxis}
            setNextSnapshot={setNextSnapshot}
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
  checkTo: PropTypes.string,
  movableTiles: PropTypes.array,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

Diagram.defaultProps = {
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default Diagram
