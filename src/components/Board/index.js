import React, { Component } from 'react'
import cx from 'classnames'
import { File } from '@components'
import css from './board.css'
// import PropTypes from 'prop-types'

class Board extends Component {
  constructor (props) {
    super(props)

    /**
     * 8 x 8 Sizes
     * Notations
     */
    this.ranks = '12345678'
    this.files = 'abcdefgh'
  }

  render () {
    return (
      <div className={css.board}>
        {this.ranks.split('').map(rank => (
          <div key={`rank-${rank}`} className={cx(css.rank, 'l-flex-row')}>
            {this.files.split('').map(file => <File key={`${rank}${file}`} rankNotation={rank} fileNotation={file} />)}
          </div>
        ))}
      </div>
    )
  }
}

export default Board
