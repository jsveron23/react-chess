import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece from '~/components/getPiece'
import { isExist } from '~/utils'
import css from './File.css'

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
    const rn = parseInt(rankName, 10)

    if (rn % 2 === 0) {
      return ['b', 'd', 'f', 'h'].includes(fileName)
    } else {
      return ['a', 'c', 'e', 'g'].includes(fileName)
    }
  })

  const cls = cx(css.file, 'l-flex-middle', 'l-flex-center', {
    'is-dark': isDark
  })

  const Piece = getPiece({ color, piece })

  return (
    <div className={cls} data-file={fileName} data-tile-name={tileName}>
      {React.createElement(
        Piece || Fragment,
        isExist(Piece) && {
          turn,
          selected,
          tileName,
          selectPiece
        }
      )}
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
