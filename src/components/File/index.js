import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece from '~/components/getPiece'
import { isExist, isEven, compose, extractFromObj, parseInt10 } from '~/utils'
import { getFileRankName } from '~/utils/chess'
import css from './File.css'

const EVEN_TILES = ['b', 'd', 'f', 'h']
const ODD_TILES = ['a', 'c', 'e', 'g']

/**
 * Get rank name
 * @param  {string} tileName
 * @return {number}
 */
const getRankName = (tileName) =>
  compose(
    parseInt10,
    extractFromObj('rankName'),
    getFileRankName
  )(tileName)

const File = ({
  turn,
  fileName,
  tileName,
  color,
  piece,
  selected,
  selectPiece
}) => {
  const rankName = getRankName(tileName)
  const darkTiles = isEven(rankName) ? EVEN_TILES : ODD_TILES
  const cls = cx(css.file, 'l-flex-middle', 'l-flex-center', {
    'is-dark': darkTiles.includes(fileName)
  })
  const Piece = getPiece({ color, piece })
  const pieceProps = isExist(Piece)
    ? {
      turn,
      selected,
      tileName,
      selectPiece
    }
    : {}

  return (
    <div className={cls} data-file={fileName} data-tile-name={tileName}>
      {React.createElement(Piece || Fragment, pieceProps)}
    </div>
  )
}

File.propTypes = {
  turn: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  tileName: PropTypes.string.isRequired,
  selectPiece: PropTypes.func.isRequired,
  selected: PropTypes.string,
  color: PropTypes.string,
  piece: PropTypes.string
}

export default File
