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
    onClick: PropTypes.func
  }

  static defaultProps = {
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

    onClick(`${side}${piece}${position}`)
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, side, position, nextMoves, selected, children } = this.props
    const cls = cx(css.fileFloat, 'l-flex-center', 'l-flex-middle', {
      'is-selected': selected === position,
      'is-nextmove': nextMoves.indexOf(position) > -1
    })

    return (
      <span data-position={position} className={css.file}>
        <div className={cls}>
          {turn === side
            ? <a href="" onClick={this.handleClick}>{children}</a>
            : children}
        </div>
      </span>
    )
  }
}

export default File
