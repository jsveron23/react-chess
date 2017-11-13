import React, { Component } from 'react'
import cx from 'classnames'
import css from './file.css'

class File extends Component {
  handleClick = evt => {
    evt.preventDefault()

    const { side, piece, position, onClick } = this.props

    onClick(`${side}${piece}${position}`)
  }

  render () {
    const { position, nextMoves, selected, children } = this.props

    return (
      <span data-position={position} className={css.file}>
        <div className={cx(css.fileFloat, 'l-flex-center', 'l-flex-middle', {
          'is-selected': selected === position,
          'is-nextmove': nextMoves.indexOf(position) > -1
        })}>
          <a href="" onClick={this.handleClick}>{children}</a>
        </div>
      </span>
    )
  }
}

export default File
