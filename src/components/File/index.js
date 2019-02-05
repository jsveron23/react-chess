import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { compose } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, extract, noop } from '~/utils'
import {
  getNextLineup,
  computeSpecial,
  parseSelectedLineupItem
} from '~/chess/core'
import { isDarkBg, getSpecial } from '~/chess/helpers'
import css from './File.css'

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    lineup: PropTypes.array.isRequired,
    selected: PropTypes.string,
    piece: PropTypes.string,
    Piece: PropTypes.func,
    movableTiles: PropTypes.array,
    setSelected: PropTypes.func,
    setMovableTiles: PropTypes.func,
    drawLineup: PropTypes.func,
    toggleTurn: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    setSelected: noop,
    setMovableTiles: noop,
    drawLineup: noop,
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
      setSelected,
      setMovableTiles
    } = this.props

    const isMovable = movableTiles.includes(tile)
    const cls = cx(css.file, { 'is-dark': isDarkBg(tile) })
    const pieceProps = {
      turn,
      piece,
      selected,
      tile,
      isMovable,
      setSelected,
      setMovableTiles
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
      lineup,
      movableTiles,
      Piece,
      setMovableTiles,
      drawLineup,
      toggleTurn
    } = this.props
    const isMovable = movableTiles.includes(tile)

    if (isMovable && isEmpty(Piece)) {
      const { side, piece } = parseSelectedLineupItem(lineup, selected)
      const special = getSpecial(piece)
      let nextLineup

      // draw next lineup
      if (isExist(special)) {
        nextLineup = compose(
          extract('lineup'),
          computeSpecial(side, special, tile, []),
          getNextLineup(selected, tile)
        )(lineup)
      } else {
        nextLineup = getNextLineup(selected, tile, lineup)
      }

      drawLineup(nextLineup)
      setMovableTiles([])
      toggleTurn()
    }
  }
}

export default File
