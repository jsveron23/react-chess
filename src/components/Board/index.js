import React, { Component } from 'react'
import cx from 'classnames'
import { File, Pawn, Rook, Bishop, Knight, Queen, King } from '@components'
import css from './board.css'

/**
 * Initial notations
 * @example wRa1
 * w  = white
 * R  = rook
 * a1 = position
 * @example bPa7
 * b  = black
 * P  = Pawn
 * a7 = position
 */
const InitialNotations = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

/**
 * Chess Board component
 * @extends {React.Component}
 */
class Board extends Component {
  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      notations: [...InitialNotations],
      selected: ''
    }

    this.pieceList = {
      P: Pawn,
      R: Rook,
      B: Bishop,
      N: Knight,
      Q: Queen,
      K: King
    }

    /**
     * Rank
     * @type {String}
     */
    this.rows = '87654321'

    /**
     * File
     * @type {String}
     */
    this.cols = 'abcdefgh'
  }

  /**
   * Get notation with using position
   * @param  {String} position
   * @return {String}
   */
  getNotation (position) {
    const { notations } = this.state

    return notations.find(n => (n.search(position) > -1)) || ''
  }

  /**
   * Parse nations
   * @param  {String} notation
   * @return {Object}
   */
  parseNotation (notation) {
    const [side, piece, ...position] = notation.split('')

    return { side, piece, position: position.join('') }
  }

  handleClick = (notation) => {
    const { position } = this.parseNotation(notation)

    this.setState({ selected: position })
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { selected } = this.state
    const ranks = this.rows.split('')
    const files = this.cols.split('')

    return (
      <div className={css.board}>
        {
          ranks.map(rank => (
            <div key={`${rank}`} className={cx(css.rank, 'l-flex-row')}>
              {
                files.map(file => {
                  const position = `${file}${rank}`
                  const notation = this.getNotation(position)
                  const { side, piece } = this.parseNotation(notation)
                  const Piece = this.pieceList[piece]

                  return (
                    <File
                      key={notation || position}
                      piece={piece}
                      side={side}
                      position={position}
                      selected={selected}
                      onClick={this.handleClick}
                    >
                      {Piece && <Piece side={side} />}
                    </File>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    )
  }
}

export default Board
