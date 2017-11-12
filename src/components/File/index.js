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
    const { position, selected, children } = this.props

    return (
      <span data-position={position} className={cx(css.file, {
        'is-selected': selected === position
      })}>
        <a href="" onClick={this.handleClick}>{children}</a>
      </span>
    )
  }
}

export default File
