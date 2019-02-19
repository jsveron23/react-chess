import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'ramda'
import getPiece, { File } from '~/components'
import { findCode, parseCode } from '~/chess/helpers'
import { noop } from '~/utils'
import css from './Rank.css'

function getPieceProps (snapshot) {
  return compose(
    parseCode,
    findCode(snapshot)
  )
}

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
        const { side, piece } = getPieceProps(snapshot)(tile)
        const Piece = getPiece(side)(piece)

        return (
          <File
            key={tile}
            turn={turn}
            piece={piece}
            Piece={Piece}
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
