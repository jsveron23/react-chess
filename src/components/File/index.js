import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getPiece } from '@pieces'
import css from './file.css'

/**
 * File component
 * @extends Component
 */
class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    piece: PropTypes.string,
    side: PropTypes.string,
    movable: PropTypes.array,
    selected: PropTypes.string,
    children: PropTypes.node,
    onSelect: PropTypes.func,
    onMoveBegin: PropTypes.func
  }

  static defaultProps = {
    side: '',
    piece: '',
    movable: [],
    selected: '',
    children: null,
    onSelect: function () {},
    onMoveBegin: function () {}
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

    const { movable, position, onMoveBegin } = this.props

    if (movable.includes(position)) {
      onMoveBegin(position)
    }
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, side, position, movable, selected, children } = this.props
    const cls = cx(css.fileFloat, 'l-flex-center', 'l-flex-middle', {
      'is-selected': selected === position,
      'is-nextmove': movable.indexOf(position) > -1
    })

    return (
      <span data-position={position} className={css.file}>
        <div className={cls} onClick={this.handleClickSquare}>
          {turn === side
            ? <a href="" onClick={this.handleSelect}>{children}</a>
            : children}
        </div>
      </span>
    )
  }
}

export default File
