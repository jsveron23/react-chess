import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getPiece } from '@pieces'
import css from './file.css'

/**
 * File component
 * @extends {React.Component}
 */
class File extends PureComponent {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    piece: PropTypes.string,
    side: PropTypes.string,
    movable: PropTypes.array,
    selected: PropTypes.string,
    children: PropTypes.node,
    onSelect: PropTypes.func,
    onMove: PropTypes.func
  }

  static defaultProps = {
    side: '',
    piece: '',
    selected: '',
    movable: [],
    onSelect: function () {},
    onMove: function () {}
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
          {turn === side
            ? <a href="" onClick={this.handleSelect}>{children}</a>
            : children}
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
