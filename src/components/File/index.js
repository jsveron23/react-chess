import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import {
  isEmpty,
  isExist,
  isEven,
  compose,
  extractFromObj,
  parseInt10
} from '~/utils'
import { getFileRankName, getNextNotations } from '~/utils/chess'
import css from './File.css'

const EVEN_TILES = ['b', 'd', 'f', 'h']
const ODD_TILES = ['a', 'c', 'e', 'g']

const getRankName = compose(
  parseInt10,
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
    color: PropTypes.string,
    piece: PropTypes.string,
    movableTiles: PropTypes.array,
    selectPiece: PropTypes.func,
    setCurrentMovable: PropTypes.func,
    setNotations: PropTypes.func,
    toggleTurn: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    selectPiece: function () {},
    setCurrentMovable: function () {},
    setNotations: function () {},
    toggleTurn: function () {}
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

    const rankName = getRankName(tileName)
    const darkTiles = isEven(rankName) ? EVEN_TILES : ODD_TILES
    const isDark = darkTiles.includes(fileName)
    const isMovable = movableTiles.includes(tileName)
    const cls = cx(css.file, {
      'is-dark': isDark,
      'is-movable': isMovable
    })

    return (
      <div
        className={cls}
        data-file={fileName}
        data-tile-name={tileName}
        onClick={this.handleClick}
      >
        {isExist(Piece) &&
          createElement(Piece, {
            turn,
            piece,
            selected,
            tileName,
            selectPiece,
            setCurrentMovable
          })}
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
