import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File } from '~/components'
import getPiece from '~/chess/getPiece'
import { findCodeByTile } from '~/chess/helpers'
import { noop } from '~/utils'
import css from './Rank.css'

const Rank = (props) => {
  const {
    turn,
    snapshot,
    files,
    rankName,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    checkTo,
    movableTiles,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props
  const cls = cx(css.rank, 'l-flex-row')
  const parseCodeByTile = findCodeByTile(snapshot)

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = `${fileName}${rankName}`
        const { side, piece } = parseCodeByTile(tile)

        return (
          <File
            key={tile}
            turn={turn}
            tile={tile}
            fileName={fileName}
            selectedPiece={selectedPiece}
            selectedSide={selectedSide}
            selectedFile={selectedFile}
            selectedRank={selectedRank}
            checkTo={checkTo}
            movableTiles={movableTiles}
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

Rank.defaultProps = {
  setSelected: noop,
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default Rank
