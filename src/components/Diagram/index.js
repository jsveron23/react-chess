import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Rank } from '~/components'
import { noop } from '~/utils'
import css from './Diagram.css'

const Diagram = (props) => {
  const {
    isDoingMatch,
    turn,
    snapshot,
    selectedKey,
    selectedTile,
    checkTo,
    ranks,
    files,
    movableTiles,
    measureDistance,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props

  const cls = cx(css.diagram, {
    'is-hidden': !isDoingMatch
  })

  return (
    <div className={cls}>
      {ranks.map((rankName) => {
        return (
          <Rank
            key={rankName}
            turn={turn}
            snapshot={snapshot}
            selectedKey={selectedKey}
            selectedTile={selectedTile}
            checkTo={checkTo}
            files={files}
            rankName={rankName}
            movableTiles={movableTiles}
            measureDistance={measureDistance}
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
  selectedKey: PropTypes.string,
  selectedTile: PropTypes.string,
  checkTo: PropTypes.string,
  movableTiles: PropTypes.array,
  measureDistance: PropTypes.func,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

Diagram.defaultProps = {
  measureDistance: noop,
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default Diagram
