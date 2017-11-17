import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File, Pawn, Rook, Bishop, Knight, Queen, King } from '@components'
import { Chess, flatten } from '@utils'
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
    return !!this.getCurrentNotation(position)
  }

  /**
   * Handle piece movement
   * @param {Object} notation
   */
  handleSelect = ({ side, piece, position }) => {
    this.setState(prevState => {
      // get Piece component
      const Piece = this.pieces[piece]

      // movement of piece
      const { defaults, specials } = Piece.movement

      // undertand movement of Chess piece
      const movable = Chess.calcMovablePath({ movement: defaults, position, side })
      const unBlockedMovable = this.filterBlockedPath({ movable, specials })

      return {
        selected: position,
        movable: unBlockedMovable
      }
    })
  }

  /**
   * Filter blocked path
   * @param  {Object} args
   * @param  {Array}  args.movable
   * @param  {Array}  args.specials
   * @return {Array}
   */
  filterBlockedPath ({ movable, specials }) {
    if (specials.indexOf('jumpover') === -1) {
      return movable.map(m => {
        const filteredDirections = m.map(direction => {
          const openedFiles = direction.map(d => (this.isPlaced(d) ? undefined : d))
          const start = openedFiles.indexOf(undefined)

          start > -1 && openedFiles.fill(undefined, start)

          return openedFiles.filter(ofs => !!ofs)
        })

        return filteredDirections
      })
    } else {
      return movable.map(m => m.map(direction => direction.filter(d => !this.isPlaced(d))))
    }
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
      style = `${style}right: ${axis.x}px;`
    }

    if (axis.y !== 0) {
      style = `${style}top: ${axis.y}px;`
    }

    el.style.cssText = style

    const rAF = () => (el.style.cssText = 'top: 0; right: 0;')

    window.requestAnimationFrame(rAF)
  }

  /**
   * Lifecycle method
   */
  componentDidUpdate () {
    this.translated = null
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { turn, movable, selected } = this.state
    const parsedMovable = flatten(movable)

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
