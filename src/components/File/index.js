import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { boundMethod } from 'autobind-decorator'
import { includes } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import { isDarkBg } from '~/chess/helpers'
import css from './File.css'

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    selectedPiece: PropTypes.string,
    selectedSide: PropTypes.string,
    selectedFile: PropTypes.string,
    selectedRank: PropTypes.string,
    Piece: PropTypes.func,
    movableTiles: PropTypes.array,
    setCapturedNext: PropTypes.func,
    setMovable: PropTypes.func,
    setNext: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    setCapturedNext: noop,
    setMovable: noop,
    setNext: noop
  }

  isMovable = memoize(includes)

  @boundMethod
  handleClick (evt) {
    evt.preventDefault()

    const { tile, Piece, movableTiles, setNext } = this.props
    const isMovable = this.isMovable(tile, movableTiles)

    if (isMovable && isEmpty(Piece)) {
      setNext(tile)
    }
  }

  render () {
    const {
      turn,
      fileName,
      tile,
      Piece,
      selectedPiece,
      selectedSide,
      selectedFile,
      selectedRank,
      movableTiles,
      setCapturedNext,
      setMovable
    } = this.props

    const isMovable = this.isMovable(tile, movableTiles)

    const pieceProps = {
      turn,
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
      <div className={cls} data-file={fileName} onClick={this.handleClick}>
        {createElement(Element, childProps)}
      </div>
    )
  }
}

export default File
