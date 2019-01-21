import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import getPiece from '~/components/getPiece'
import { isExist } from '~/utils'
import css from './File.css'

const File = ({ tileName, color, piece }) => {
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

  const Piece = getPiece({ color, piece }) || Fragment

  return (
    <div className={cls} data-tile-name={tileName}>
      <Piece />
    </div>
  )
}

File.propTypes = {
  tileName: PropTypes.string.isRequired,
  color: PropTypes.string,
  piece: PropTypes.string
}

export default File
