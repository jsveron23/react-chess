import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { File } from '~/components'
import getPiece from '~/components/getPiece'
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
        const tile = `${fileName}${rankName}`
        const notation = notations.find((n) => n.indexOf(tile) > -1) || ''
        const [c, p] = notation.split('')
        const Piece = getPiece({ color: c, piece: p })

        return (
          <File
            key={tile}
            turn={turn}
            piece={p}
            Piece={Piece}
            notations={notations}
            selected={selected}
            fileName={fileName}
            tileName={tile}
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
  selectPiece: function () {},
  setCurrentMovable: function () {},
  setNotations: function () {},
  toggleTurn: function () {}
}

export default Rank
