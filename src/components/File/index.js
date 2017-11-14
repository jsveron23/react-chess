import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './file.css'

/**
 * File component
 * @extends Component
 */
class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    side: PropTypes.string,
    movable: PropTypes.array,
    selected: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  static defaultProps = {
    side: '',
    movable: [],
    selected: '',
    children: null,
    onClick: function () {}
  }

  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      name: props.piece,
      isMoved: false
    }
  }

  /**
   * Tell current notation
   * @param {Proxy} evt
   */
  handleClick = evt => {
    evt.preventDefault()

    const { side, piece, position, onClick } = this.props

    onClick({ side, piece, position })
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
        <div className={cls}>
          {
            turn === side
              ? <a href="" onClick={this.handleClick}>{children}</a>
              : children
          }
        </div>
      </span>
    )
  }
}

export default File
