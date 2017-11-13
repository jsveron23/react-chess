import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File, Pawn, Rook, Bishop, Knight, Queen, King } from '@components'
import { Chess } from '@utils'
import css from './board.css'

/**
 * Chess Board component
 * @extends {React.Component}
 */
class Board extends Component {
  static propTypes = {
    notations: PropTypes.array
  }

  static defaultProps = {
    /**
     * @type {Array}
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
    notations: [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
      'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
    ]
  }

  /**
   * Rank
   * @type {Array}
   * @static
   * @readonly
   */
  static gridRows = '87654321'.split('')

  /**
   * File
   * @type {Array}
   * @static
   * @readonly
   */
  static gridCols = 'abcdefgh'.split('')

  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      notations: props.notations,
      turn: 'w',
      movable: [],
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
  }

  /**
   * Get notation with using position
   * @param  {String} position
   * @return {String}
   */
  getCurrentNotation (position) {
    const { notations } = this.state

    return notations.find(n => (n.search(position) > -1)) || ''
  }

  passPlaced (position) {
    const { notations } = this.state
    const isPlaced = notations.find(n => (n.search(position) > -1)) // && (n.split('')[0] === side)

    return !isPlaced
  }

  /**
   * Handle piece movement
   * @param {Object} notation
   */
  handlePiece = ({ side, piece, position }) => {
    const { notations } = this.state

    // get file, rank from position string
    const [file, rank] = position.split('')

    // component of piece
    const Piece = this.pieceList[piece]

    // undertand movement of Chess piece (static)
    let movable = Piece.movement.map(([x, y]) => {
      const fileIdx = Chess.getFileIdx(file)
      const nextX = x + fileIdx
      const nextY = side === 'w'
        ? y + parseInt(rank, 10)
        : parseInt(rank, 10) - y

      if (nextX >= 0 && nextY >= 0 && !!Chess.getFile(nextX)) {
        const nextPosition = `${Chess.getFile(nextX)}${nextY}`

        return nextPosition
      }
    }).filter(m => !!m)

    // blocked?
    if (Piece.specials.indexOf('jump') === -1) {
      const found = notations.filter(notation => {
        const { position } = Chess.parseNotation(notation)

        return movable.indexOf(position) > -1
      })

      movable = found.length === 0 ? movable : []
    } else {
      movable = movable.filter(m => this.passPlaced(m))
    }

    this.setState({
      selected: position,
      movable
    })
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, movable, selected } = this.state

    return (
      <div className={css.board}>
        {
          Board.gridRows.map(rank => (
            <div key={`${rank}`} className={cx(css.rank, 'l-flex-row')}>
              {
                Board.gridCols.map(file => {
                  const position = `${file}${rank}`
                  const notation = this.getCurrentNotation(position)
                  const { side, piece } = Chess.parseNotation(notation)
                  const Piece = this.pieceList[piece]

                  return (
                    <File
                      key={notation || position}
                      piece={piece}
                      side={side}
                      turn={turn}
                      position={position}
                      selected={selected}
                      movable={movable}
                      onClick={this.handlePiece}
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
