import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { includes } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import { isDarkBg } from '~/chess/helpers'
import css from './File.css'

const File = (props) => {
  const {
    turn,
    fileName,
    tile,
    piece,
    Piece,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    movableTiles,
    setCapturedNext,
    setMovable,
    setNext
  } = props

  const isMovable = includes(tile, movableTiles)

  // pressing a tile
  function handleClick (evt) {
    evt.preventDefault()

    if (isMovable && isEmpty(Piece)) {
      setNext(tile)
    }
  }

  const pieceProps = {
    turn,
    piece,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    tile,
    isMovable,
    setCapturedNext,
    setMovable
  }

  const blankProps = {
    tagName: 'div',
    className: cx({ 'is-movable': isMovable })
  }

  const Element = Piece || Blank
  const childProps = isExist(Piece) ? pieceProps : blankProps
  const cls = cx(css.file, { 'is-dark': isDarkBg(tile) })

  return (
    <div className={cls} data-file={fileName} onClick={handleClick}>
      {createElement(Element, childProps)}
    </div>
  )
}

File.propTypes = {
  turn: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  tile: PropTypes.string.isRequired,
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  piece: PropTypes.string,
  Piece: PropTypes.func,
  movableTiles: PropTypes.array,
  setCapturedNext: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

File.defaultProps = {
  movableTiles: [],
  setCapturedNext: noop,
  setMovable: noop,
  setNext: noop
}

export default File
