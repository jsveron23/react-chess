import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { split } from 'ramda'
import getPiece, { File } from '~/components'
import { noop } from '~/utils'
import css from './Rank.css'

const Rank = ({
  turn,
  notations,
  files,
  rankName,
  selected,
  movableTiles,
  selectPiece,
  setCurrentMovable,
  setNotations,
  toggleTurn
}) => {
  const cls = cx(css.rank, 'l-flex-row')

  return (
    <div className={cls} data-rank={rankName}>
      {files.map((fileName) => {
        const tileName = `${fileName}${rankName}`
        const notation = notations.find((n) => n.includes(tileName))
        const [color, piece] = split('', notation || '')
        const Piece = getPiece({ color, piece })

        return (
          <File
            key={tileName}
            turn={turn}
            piece={piece}
            Piece={Piece}
            notations={notations}
            selected={selected}
            fileName={fileName}
            tileName={tileName}
            movableTiles={movableTiles}
            selectPiece={selectPiece}
            setCurrentMovable={setCurrentMovable}
            setNotations={setNotations}
            toggleTurn={toggleTurn}
          />
        )
      })}
    </div>
  )
}

Rank.propTypes = {
  notations: PropTypes.array.isRequired,
  turn: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  rankName: PropTypes.string.isRequired,
  selected: PropTypes.string,
  currentMovableTiles: PropTypes.array,
  selectPiece: PropTypes.func,
  setCurrentMovable: PropTypes.func,
  setNotations: PropTypes.func,
  toggleTurn: PropTypes.func
}

Rank.defaultProps = {
  selectPiece: noop,
  setCurrentMovable: noop,
  setNotations: noop,
  toggleTurn: noop
}

export default Rank
