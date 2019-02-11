import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import { isDarkBg } from '~/chess/helpers'
import css from './File.css'

const File = (props) => {
  const {
    turn,
    fileName,
    tile,
    lineup,
    piece,
    Piece,
    selectedPiece,
    selectedSide,
    selectedFile,
    selectedRank,
    movableTiles,
    setLineup,
    setMovable,
    setNext
  } = props

  const isMovable = movableTiles.includes(tile)

  // pressing a tile
  function handleClick (evt) {
    evt.preventDefault()

    if (isMovable && isEmpty(Piece)) {
      setNext({ tile, movableTiles })
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
    lineup,
    isMovable,
    setLineup,
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
  lineup: PropTypes.array.isRequired,
  selectedPiece: PropTypes.string,
  selectedSide: PropTypes.string,
  selectedFile: PropTypes.string,
  selectedRank: PropTypes.string,
  piece: PropTypes.string,
  Piece: PropTypes.func,
  movableTiles: PropTypes.array,
  setLineup: PropTypes.func,
  setMovable: PropTypes.func,
  setNext: PropTypes.func
}

File.defaultProps = {
  movableTiles: [],
  setLineup: noop,
  setMovable: noop,
  setNext: noop
}

export default File
