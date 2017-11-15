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
    notations: Chess.notations
  }

  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      notations: [...props.notations],
      turn: 'w',
      movable: [],
      selected: ''
    }

    /**
     * Components
     * @type {Object}
     */
    this.pieces = {
      P: Pawn,
      R: Rook,
      B: Bishop,
      N: Knight,
      Q: Queen,
      K: King,
      Pawn,
      Rook,
      Bishop,
      Knight,
      Queen,
      King
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
  // isBlocked (notations, movable) {
  //   const placed = notations.filter(n => {
  //     const { position } = Chess.parseNotation(n)
  //
  //     return movable.indexOf(position) > -1
  //   })
  //
  //   return placed.length === 0
  // }

  /**
   * Handle piece movement
   * @param {Object} notation
   */
  handleSelect = ({ side, piece, position }) => {
    this.setState(prevState => {
      // const { notations } = prevState

      // movement of piece
      const movement = Chess.getMovement(piece)

      // special movement of piece
      // const specials = Chess.getSpecials(piece)

      // undertand movement of Chess piece
      let movable = Chess.calcMovablePath({ movement, position, side })

      // movable and included blocked
      // if (specials.indexOf('jump') === -1) {
      //   movable = movable.map(m => {
      //     const filteredDirections = m.map(direction => {
      //       const openedFiles = direction.reduce((a, b) => {
      //         return this.isPlaced(b) ? [] : a.concat(b)
      //       })
      //
      //       // const isOpened = filteredFiles.reduce((a, b) => {
      //       //   return
      //       // })
      //       //
      //       return openedFiles
      //     })
      //
      //     return filteredDirections
      //   })
      // }
      //
      // console.log(movable)

      return {
        selected: position,
        movable
      }
    })
  }

  handleMove = (position) => {
    // this.setState(prevState => {
    //   const turn = {
    //     w: 'b',
    //     b: 'w'
    //   }
    //
    //   const { notations, selected } = prevState
    //   const nextNotations = notations.map(n => {
    //     let nextNotation = n
    //
    //     if (n.search(selected) > -1) {
    //       const { side, piece } = Chess.parseNotation(n)
    //
    //       nextNotation = `${side}${piece}${position}`
    //     }
    //
    //     return nextNotation
    //   })
    //
    //   return {
    //     notations: nextNotations,
    //     turn: turn[prevState.turn],
    //     selected: '',
    //     movable: []
    //   }
    // })
  }

  flattenMovable (movable) {
    if (movable.length === 0) {
      return movable
    }

    const flatten = movable.reduce((a, b) => a.concat(b))
    const shouldFlattened = flatten.every(f => (typeof f === 'string'))

    if (!shouldFlattened) {
      return this.flattenMovable(flatten)
    }

    return flatten
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, movable, selected } = this.state
    const parsedMovable = this.flattenMovable(movable)

    return (
      <div className={css.board}>
        {
          Chess.ranks.map(rank => (
            <div key={rank} className={cx(css.rank, 'l-flex-row')}>
              {
                Chess.files.map(file => {
                  const position = `${file}${rank}`
                  const currentNotation = this.getCurrentNotation(position)
                  const { side, piece } = Chess.parseNotation(currentNotation)
                  const Piece = this.pieces[piece]

                  return (
                    <File
                      key={position}
                      piece={piece}
                      side={side}
                      turn={turn}
                      position={position}
                      selected={selected}
                      movable={parsedMovable}
                      onSelect={this.handleSelect}
                      onMove={this.handleMove}
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
