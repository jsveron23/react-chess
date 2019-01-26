import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece from '~/components/getPiece'
import { isExist, isEven, compose, extractFromObj, parseInt10 } from '~/utils'
import { getFileRankName } from '~/utils/chess'
import css from './File.css'

const EVEN_TILES = ['b', 'd', 'f', 'h']
const ODD_TILES = ['a', 'c', 'e', 'g']

const getRankName = compose(
  parseInt10,
  extractFromObj('rankName'),
  getFileRankName
)

const File = ({
  turn,
  fileName,
  tileName,
  color,
  piece,
  selected,
  movableTiles,
  selectPiece,
  setCurrentMovable
}) => {
  const rankName = getRankName(tileName)
  const darkTiles = isEven(rankName) ? EVEN_TILES : ODD_TILES
  const cls = cx(css.file, {
    'is-dark': darkTiles.includes(fileName),
    'is-movable': movableTiles.includes(tileName)
  })
  const Piece = getPiece({ color, piece })

  return (
    <div className={cls} data-file={fileName} data-tile-name={tileName}>
      {isExist(Piece) &&
        React.createElement(Piece, {
          turn,
          piece,
          selected,
          tileName,
          selectPiece,
          setCurrentMovable
        })}
    </div>
  )
}

File.propTypes = {
  turn: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  tileName: PropTypes.string.isRequired,
  selected: PropTypes.string,
  color: PropTypes.string,
  piece: PropTypes.string,
  movableTiles: PropTypes.array,
  selectPiece: PropTypes.func,
  setCurrentMovable: PropTypes.func
}

File.defaultProps = {
  movableTiles: [],
  selectPiece: function () {},
  setCurrentMovable: function () {}
}

export default File
