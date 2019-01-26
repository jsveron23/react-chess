import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { Blank } from '~/components'
import {
  isEmpty,
  isExist,
  isEven,
  noop,
  compose,
  extractFromObj
} from '~/utils'
import { getFileRankName, parseRankNum, getNextNotations } from '~/utils/chess'
import css from './File.css'

const EVEN_TILES = ['b', 'd', 'f', 'h']
const ODD_TILES = ['a', 'c', 'e', 'g']

const getRankNameNum = compose(
  parseRankNum,
  extractFromObj('rankName'),
  getFileRankName
)

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tileName: PropTypes.string.isRequired,
    notations: PropTypes.array.isRequired,
    selected: PropTypes.string,
    piece: PropTypes.string,
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

    const rankName = getRankNameNum(tileName)
    const darkTiles = isEven(rankName) ? EVEN_TILES : ODD_TILES
    const isDark = darkTiles.includes(fileName)
    const isMovable = movableTiles.includes(tileName)
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
    const Element = isExist(Piece) ? Piece : Blank
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
      const nextNotations = getNextNotations(selected)(tileName, notations)

      setNotations(nextNotations)
      setCurrentMovable([])
      toggleTurn()
    }
  }
}

export default File
