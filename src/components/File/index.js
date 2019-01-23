import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece from '~/components/getPiece'
import { isExist } from '~/utils'
import css from './File.css'

const EVEN_TILES = ['b', 'd', 'f', 'h']
const ODD_TILES = ['a', 'c', 'e', 'g']

const File = ({
  turn,
  fileName,
  tileName,
  color,
  piece,
  selected,
  selectPiece
}) => {
  const isDark = tileName.split('').reduce((fileName, rankName) => {
    const parsedRankName = parseInt(rankName, 10)
    const darkTiles = parsedRankName % 2 === 0 ? EVEN_TILES : ODD_TILES

    return darkTiles.includes(fileName)
  })

  const cls = cx(css.file, 'l-flex-middle', 'l-flex-center', {
    'is-dark': isDark
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
