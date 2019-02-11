import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece, { File } from '~/components'
import { noop } from '~/utils'
import css from './Rank.css'

const Rank = (props) => {
  const {
    turn,
    lineup,
    files,
    rankName,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    movableTiles,
    getPieceProps,
    setLineup,
    setMovable,
    setNext
  } = props
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tile = `${fileName}${rankName}`
        const { side, piece } = getPieceProps({ tile, lineup })
        const Piece = getPiece({ side, piece })

        return (
          <File
            key={tile}
            turn={turn}
            piece={piece}
            Piece={Piece}
            lineup={lineup}
            selectedPiece={selectedPiece}
            selectedSide={selectedSide}
            selectedFile={selectedFile}
            selectedRank={selectedRank}
            fileName={fileName}
            tile={tile}
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

Rank.propTypes = {
  lineup: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired,
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  movableTiles: PropTypes.array,
  setLineup: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

Rank.defaultProps = {
  setSelected: noop,
  setLineup: noop,
  setMovable: noop,
  setNext: noop
}

export default Rank
