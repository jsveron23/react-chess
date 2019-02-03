import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { includes } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import { getNextNotations } from '~/chess/core'
import { isDarkBg } from '~/chess/helpers'
import css from './File.css'

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tileName: PropTypes.string.isRequired,
    notations: PropTypes.array.isRequired,
    selected: PropTypes.string,
    piece: PropTypes.string,
    Piece: PropTypes.func,
    movableTiles: PropTypes.array,
    selectPiece: PropTypes.func,
    setCurrentMovable: PropTypes.func,
    setNotations: PropTypes.func,
    toggleTurn: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    selectPiece: noop,
    setCurrentMovable: noop,
    setNotations: noop,
    toggleTurn: noop
  }

  render () {
    const {
      turn,
      fileName,
      tileName,
      piece,
      Piece,
      selected,
      movableTiles,
      selectPiece,
      setCurrentMovable
    } = this.props

    const isDark = isDarkBg(tileName)
    const isMovable = includes(tileName, movableTiles)
    const cls = cx(css.file, {
      'is-dark': isDark
    })
    const pieceProps = {
      turn,
      piece,
      selected,
      tileName,
      isMovable,
      selectPiece,
      setCurrentMovable
    }
    const blankProps = {
      tagName: 'div',
      className: cx({ 'is-movable': isMovable })
    }
    const Element = Piece || Blank
    const childProps = isExist(Piece) ? pieceProps : blankProps

    return (
      <div className={cls} data-file={fileName} onClick={this.handleClick}>
        {createElement(Element, childProps)}
      </div>
    )
  }

  @boundMethod
  handleClick (evt) {
    evt.preventDefault()

    const {
      tileName,
      selected,
      notations,
      movableTiles,
      Piece,
      setCurrentMovable,
      setNotations,
      toggleTurn
    } = this.props
    const isMovable = movableTiles.includes(tileName)

    if (isMovable && isEmpty(Piece)) {
      const nextNotations = getNextNotations(selected, tileName, notations)

      setNotations(nextNotations)
      setCurrentMovable([])
      toggleTurn()
    }
  }
}

export default File
