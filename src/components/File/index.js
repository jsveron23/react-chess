import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getPiece } from '@pieces'
import {
  isEmpty,
  isExist,
  // isDiff,
  intersection
} from '@utils'
import css from './file.css'

class File extends Component {
  static propTypes = {
    isMoving: PropTypes.bool.isRequired,
    turn: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    piece: PropTypes.string,
    side: PropTypes.string,
    movable: PropTypes.array,
    selected: PropTypes.string,
    children: PropTypes.node,
    check: PropTypes.string,
    onSelect: PropTypes.func,
    onMove: PropTypes.func
  }

  static defaultProps = {
    side: '',
    check: '',
    piece: '',
    selected: '',
    movable: [],
    onSelect: function () {},
    onMove: function () {}
  }

  shouldComponentUpdate (nextProps) {
    const prevProps = this.props
    const {
      isMoving,
      check,
      piece,
      selected,
      position,
      movable
    } = nextProps
    const isNotChecked = isEmpty(check)
    const isNotPromoted = !(prevProps.piece === 'P' && piece === 'Q')
    const prevWorkTiles = intersection(prevProps.movable)([selected, position])
    const nextWorkTiles = intersection(movable)([selected, position])
    const shouldNotUpdateInMove = ( // TODO reduce more rendering
      isMoving &&
      isExist(movable) &&
      isEmpty(nextWorkTiles) &&
      isNotChecked
    )
    const shouldNotUpdateInStop = (
      !isMoving &&
      isNotChecked &&
      isNotPromoted &&
      prevProps.selected !== position &&
      isEmpty(prevWorkTiles) === isEmpty(nextWorkTiles)
    )

    if (shouldNotUpdateInMove) {
      return false
    }

    if (shouldNotUpdateInStop) {
      return false
    }

    return true
  }

  render () {
    const {
      turn,
      side,
      position,
      movable,
      selected,
      children
    } = this.props
    const cls = cx(css.fileFloat, 'l-flex-center', 'l-flex-middle', {
      'is-selected': selected === position,
      'is-nextmove': movable.includes(position)
    })

    return (
      <span data-position={position} className={css.file}>
        <div className={cls} onClick={this.handleClickSquare}>
          {
            turn === side
              ? <a href="" onClick={this.handleSelect}>{children}</a>
              : children
          }
        </div>
      </span>
    )
  }

  handleSelect = (evt) => {
    evt.preventDefault()

    const { side, piece, position, onSelect } = this.props
    const { movement } = getPiece(piece)

    onSelect({ side, piece, position, ...movement })
  }

  handleClickSquare = (evt) => {
    evt.preventDefault()

    const { position, movable, onMove } = this.props

    if (movable.includes(position)) {
      onMove(position)
    }
  }
}

export default File
