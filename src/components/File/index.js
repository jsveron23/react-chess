import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getPiece } from '@pieces'
import { isDiff, isExist, isEmpty } from '@utils'
import css from './file.css'

/**
 * File component
 * @extends {React.Component}
 */
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
      turn,
      check,
      selected,
      position,
      movable
    } = nextProps
    const isTurnChanged = (
      prevProps.turn !== turn
    ) // undo
    const applyDiff = isDiff(movable)
    const isEqualSelection = (
      prevProps.selected === selected &&
      !applyDiff(prevProps.movable)
    )
    const isChangeSelection = (
      prevProps.selected !== selected &&
      applyDiff(prevProps.movable)
    )
    const isExcluded = (
      selected !== position &&
      movable.indexOf(position) === -1
    )
    const isPrevExculded = (
      prevProps.selected !== prevProps.position &&
      prevProps.movable.indexOf(prevProps.position) === -1
    )

    if (isExist(selected) && isExcluded && isPrevExculded && !isTurnChanged) {
      return false
    }

    if (isChangeSelection && isExcluded && isPrevExculded && !isTurnChanged && isEmpty(check)) {
      return false
    }

    if (isEqualSelection && isEmpty(check) && !isTurnChanged) {
      return false
    }

    return true
  }

  render () {
    const { turn, side, position, movable, selected, children } = this.props
    const cls = cx(css.fileFloat, 'l-flex-center', 'l-flex-middle', {
      'is-selected': selected === position,
      'is-nextmove': movable.indexOf(position) > -1
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

  /**
   * Tell current notation
   * @param {Proxy} evt
   */
  handleSelect = evt => {
    evt.preventDefault()

    const { side, piece, position, onSelect } = this.props
    const { movement } = getPiece(piece)

    onSelect({ side, piece, position, ...movement })
  }

  /**
   * Handle click to move piece
   * @param {Proxy} evt
   */
  handleClickSquare = evt => {
    evt.preventDefault()

    const { position, movable, onMove } = this.props

    if (movable.includes(position)) {
      onMove(position)
    }
  }
}

export default File
