import React, { memo } from 'react'
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
    getPosition,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props

  return (
    <div
      className={cx(css.diagram, {
        'is-hidden': !isDoingMatch
      })}
    >
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
            getPosition={getPosition}
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
  getPosition: PropTypes.func,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

Diagram.defaultProps = {
  getPosition: noop,
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default memo(Diagram)
