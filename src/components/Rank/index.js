import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'ramda'
import { File } from '~/components'
import getPiece from '~/chess/getPiece'
import { findCode, parseCode } from '~/chess/helpers'
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
    movableTiles,
    setCapturedNext,
    setMovable,
    setNext
  } = props
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = `${fileName}${rankName}`
        const { side, piece } = compose(
          parseCode,
          findCode(snapshot)
        )(tile)
        const Piece = getPiece(side)(piece)

        return (
          <File
            key={tile}
            Piece={Piece}
            turn={turn}
            selectedPiece={selectedPiece}
            selectedSide={selectedSide}
            selectedFile={selectedFile}
            selectedRank={selectedRank}
            fileName={fileName}
            tile={tile}
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

Rank.propTypes = {
  snapshot: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired,
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  movableTiles: PropTypes.array,
  setCapturedNext: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

Rank.defaultProps = {
  setSelected: noop,
  setCapturedNext: noop,
  setMovable: noop,
  setNext: noop
}

export default Rank
