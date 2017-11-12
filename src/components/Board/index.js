import React, { Component } from 'react'
import cx from 'classnames'
import { Rank } from '@components'
import css from './board.css'
// import PropTypes from 'prop-types'

/**
 * Notations
 * @type {String}
 * @readonly
 */
const RANK = 'hgfedcba'

/**
 * Notations
 * @type {String}
 * @readonly
 */
const FILE = '87654321'

/**
 * Chess Board component
 * @extends {React.Component}
 */
class Board extends Component {
  static map = {
    w: 'white',
    b: 'black',
    R: 'Rook',
    N: 'Knight',
    B: 'Bishop',
    Q: 'Queen',
    K: 'King',
    P: 'Pawn'
  }

  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    /**
     * @example wRa1
     * w  = white
     * R  = rook
     * a1 = notation
     * @example bPa7
     * b  = black
     * P  = Pawn
     * a7 = notation
     */
    const init = [
      'bRa8', 'bNb8', 'bRh8', 'bQd8', 'bKe8', 'bBc8', 'bNg8', 'bBf8',
      'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wRh1', 'wNg1', 'wBf1'
    ]

    this.state = {
      pieces: [...init]
    }
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { pieces } = this.state

    return (
      <div className={css.board}>
        {FILE.split('').map(f => (
          <div key={`file-${f}`} className={cx(css.file, 'l-flex-row')}>
            {RANK.split('').map(r =>
              <Rank key={`${r}${f}`} map={Board.map} pieces={pieces} notation={`${r}${f}`} />)}
          </div>
        ))}
      </div>
    )
  }
}

export default Board
