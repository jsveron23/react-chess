import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import cx from 'classnames'
import * as R from 'ramda'
import { File } from '~/components'
import getPiece from '~/chess/getPiece'
import { findCodeByTile, createTile } from '~/chess/helpers'
import { noop } from '~/utils'
import css from './Rank.css'

const memoizeCreateTile = memoize(createTile)
const memoizeFindCodeByTile = memoize(findCodeByTile, R.equals)

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
    animate,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = memoizeCreateTile(fileName, rankName)
        const { side, piece } = memoizeFindCodeByTile(snapshot, tile)

        return (
          <File
            key={tile}
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
  animate: PropTypes.object,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

Rank.defaultProps = {
  setSelected: noop,
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default Rank
