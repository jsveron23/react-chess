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
    notations: Chess.initNotations
  }

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

    this.pieceAlias = {
      P: 'pawn',
      R: 'rook',
      B: 'bishop',
      N: 'knight',
      Q: 'queen',
      K: 'king'
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

  /**
   * Is any piece there?
   * @param  {String}  position
   * @return {Boolean}
   */
  isPlaced (position) {
    const { notations } = this.state

    return !!notations.find(n => (n.search(position) > -1))
  }

  /**
   * Is there place blocked?
   * @param  {Array}   notations
   * @param  {Array}   movable
   * @return {Boolean}
   */
  isBlocked (notations, movable) {
    const placed = notations.filter(n => {
      const { position } = Chess.parseNotation(n)

      return movable.indexOf(position) > -1
    })

    return placed.length === 0
  }

  /**
   * Handle piece movement
   * @param {Object} notation
   */
  handlePiece = ({ side, piece, position }) => {
    this.setState(prevState => {
      const { notations } = prevState

      // piece name
      const pieceName = this.pieceAlias[piece]

      // static value of piece
      const Piece = Chess[pieceName]

      // movement of piece
      const movement = Piece.movement

      // special movement of piece
      const specials = Piece.specials

      // undertand movement of Chess piece
      let movable = Chess.calcMovablePath({ movement, position, side })

      // blocked or not?
      movable = (specials.indexOf('jump') === -1)
        ? (this.isBlocked(notations, movable) ? movable : [])
        : movable.filter(m => !this.isPlaced(m))

      return {
        selected: position,
        movable
      }
    })
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, movable, selected } = this.state
    const { files, ranks } = Chess.board

    return (
      <div className={css.board}>
        {
          ranks.map(rank => (
            <div key={rank} className={cx(css.rank, 'l-flex-row')}>
              {
                files.map(file => {
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
