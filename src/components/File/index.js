import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getPiece } from '@pieces'
import { isEmpty } from '@utils'
import detect from '@utils/React/detect'
import css from './file.css'

class File extends Component {
  static propTypes = {
    isMoving: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    turn: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    shouldAnimate: PropTypes.bool,
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
    shouldAnimate: false,
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
      shouldAnimate,
      turn,
      side,
      piece,
      check,
      position,
      arrived,
      isActivated
    } = nextProps

    // when seleced
    const isNotPromoted = !(prevProps.piece === 'P' && piece === 'Q')
    const isNotChecked = isEmpty(check)

    // when moving
    const isSameTurn = (
      side === arrived.side &&
      prevProps.turn === turn
    )

    // TODO
    // - detect moving tiles
    // - then can be filtering tiles that inactive
    const shouldNotUpdate = {
      moving: (
        isMoving &&
        !shouldAnimate &&
        isSameTurn
      ),

      selected: (
        !isMoving &&
        isNotChecked &&
        isNotPromoted &&
        prevProps.isActivated === isActivated &&
        !isActivated
      )
    }

    detect({
      displayName: `File-${position}`,
      mode: 'changed',
      exclude: ['children', 'onSelect', 'onMove'],
      conditions: () => !shouldNotUpdate.selected
    })(this.props)(nextProps)

    if (shouldNotUpdate.selected || shouldNotUpdate.moving) {
      return false
    }

    return true
  }

  render () {
    const {
      turn,
      name,
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
      <span data-position={position} className={css.file} data-file={name}>
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
