import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { includes, compose } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import {
  getNextNotations,
  computeSpecial,
  parseSelectedNotation
} from '~/chess/core'
import { isDarkBg, getSpecial } from '~/chess/helpers'
import css from './File.css'

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
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
      tile,
      piece,
      Piece,
      selected,
      movableTiles,
      selectPiece,
      setCurrentMovable
    } = this.props

    const isDark = isDarkBg(tile)
    const isMovable = includes(tile, movableTiles)
    const cls = cx(css.file, {
      'is-dark': isDark
    })
    const pieceProps = {
      turn,
      piece,
      selected,
      tile,
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
      tile,
      selected,
      notations,
      movableTiles,
      Piece,
      setCurrentMovable,
      setNotations,
      toggleTurn
    } = this.props
    const isMovable = movableTiles.includes(tile)

    if (isMovable && isEmpty(Piece)) {
      const { side, piece } = parseSelectedNotation(notations, selected)
      const special = getSpecial(piece)

      if (isExist(special)) {
        const { notations: nextNotations } = compose(
          computeSpecial(side, special, tile, []),
          getNextNotations(selected, tile)
        )(notations)

        setNotations(nextNotations)
      } else {
        const nextNotations = getNextNotations(selected, tile, notations)

        setNotations(nextNotations)
      }

      setCurrentMovable([])
      toggleTurn()
    }
  }
}

export default File
