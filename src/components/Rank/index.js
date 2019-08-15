import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File } from '~/components'
import { findCodeByTile } from '~/chess/helpers'
import { noop, merge } from '~/utils'
import css from './Rank.css'
import useMeasure from './useMeasure'
import getPiece from './getPiece'

const Rank = (props) => {
  const {
    turn,
    snapshot,
    files,
    rankName,
    selectedKey,
    selectedTile,
    checkTo,
    movableTiles,
    getPosition,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props
  const cls = cx(css.rank, 'l-flex-row')

  // get width
  const ref = createRef()
  const width = useMeasure(ref)

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = merge.txt(fileName, rankName)
        const { side, piece } = findCodeByTile(snapshot, tile)
        const animate = getPosition(width)

        return (
          <File
            key={tile}
            ref={ref}
            turn={turn}
            tile={tile}
            fileName={fileName}
            selectedKey={selectedKey}
            selectedTile={selectedTile}
            checkTo={checkTo}
            movableTiles={movableTiles}
            animate={animate}
            setNextCapturedSnapshot={setNextCapturedSnapshot}
            setNextMovableAxis={setNextMovableAxis}
            setNextSnapshot={setNextSnapshot}
          >
            {getPiece(side, piece)}
          </File>
        )
      })}
    </div>
  )
}

Rank.propTypes = {
  snapshot: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired,
  selectedKey: PropTypes.string,
  selectedTile: PropTypes.string,
  checkTo: PropTypes.string,
  movableTiles: PropTypes.array,
  getPosition: PropTypes.func,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

Rank.defaultProps = {
  setSelected: noop,
  getPosition: noop,
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default Rank
