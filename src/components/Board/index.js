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

    // no need to keep it
    this.translated = null
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
   * Handle piece movement
   * @param {Object} notation
   */
  handleSelect = ({ side, piece, position }) => {
    this.setState(prevState => {
      // const { notations } = prevState

      // movement of piece
      const movement = Chess.getMovement(piece)

      // special movement of piece
      const specials = Chess.getSpecials(piece)

      // undertand movement of Chess piece
      let movable = Chess.calcMovablePath({ movement, position, side })

      // movable and included blocked
      if (specials.indexOf('jump') === -1) {
        movable = movable.map(m => {
          const filteredDirections = m.map(direction => {
            const openedFiles = direction.map(d => (this.isPlaced(d) ? undefined : d))
            const start = openedFiles.indexOf(undefined)

            start > -1 && openedFiles.fill(undefined, start)

            return openedFiles.filter(ofs => !!ofs)
          })

          return filteredDirections
        })
      } else {
        movable = movable.map(m => m.map(direction => direction.filter(d => !this.isPlaced(d))))
      }

      return {
        selected: position,
        movable
      }
    })
  }

  /**
   * Handle after moving
   * @param {String} position
   */
  handleMove = (position, cb) => {
    this.setState(prevState => {
      const turn = {
        w: 'b',
        b: 'w'
      }

      const { notations, selected } = prevState
      const nextNotations = notations.map(n => {
        let nextNotation = n

        if (n.search(selected) > -1) {
          const { side, piece } = Chess.parseNotation(n)

          nextNotation = `${side}${piece}${position}`

          // passing prop to show moving animation
          this.translated = {
            notation: nextNotation,
            axis: Chess.calcAxis(n, nextNotation)
          }
        }

        return nextNotation
      })

      return {
        notations: nextNotations,
        turn: turn[prevState.turn],
        selected: '',
        movable: []
      }
    })
  }

  /**
   * Moving animation
   * @param {Object} axis
   * @param {Object} el
   */
  handleAnimate = (axis, el) => {
    let style = ''

    if (axis.x !== 0) {
      const x = -`${axis.x}`
      style = `${style}left: ${x}px;`
    }

    if (axis.y !== 0) {
      style = `${style}top: ${axis.y}px;`
    }

    el.style.cssText = style

    const rAF = () => (el.style.cssText = 'top: 0; left: 0;')

    window.requestAnimationFrame(rAF)
  }

  /**
   * Transform multiple dimensional array to single
   * @param  {Array} movable
   * @return {Array}
   */
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

  componentDidUpdate () {
    this.translated = null
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, movable, selected } = this.state
    const parsedMovable = this.flattenMovable(movable)

    return [
      <div key="body" className={css.board}>
        {
          Chess.ranks.map(rank => (
            <div key={rank} className={cx(css.rank, 'l-flex-row')}>
              {
                Chess.files.map(file => {
                  const position = `${file}${rank}`
                  const currentNotation = this.getCurrentNotation(position)
                  const { side, piece } = Chess.parseNotation(currentNotation)
                  const Piece = this.pieces[piece]
                  const shouldAnimate = (this.translated && this.translated.notation === currentNotation)

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
                      {
                        /* no use state, no auto render */
                        Piece && <Piece
                          side={side}
                          translated={shouldAnimate && this.translated}
                          doAnimate={shouldAnimate && this.handleAnimate}
                        />
                      }
                    </File>
                  )
                })
              }
            </div>
          ))
        }
      </div>,
      <div key="footer" className="information">
        Turn: {turn === 'w' ? 'White' : 'Black'}
      </div>
    ]
  }
}

export default Board
