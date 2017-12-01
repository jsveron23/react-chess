import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File, Turn, Pawn, Rook, Bishop, Knight, Queen, King, Records } from '@components'
import { flatten, isExist } from '@utils'
import Chess from '@utils/Chess'
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
    notations: [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
      'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
    ]
  }

  /**
   * GRID
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      notations: props.notations,
      turn: 'w',
      selected: '',
      movable: [],
      records: []
    }

    this.pieceList = {
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

    // instant data
    // reset per update
    this.translated = null

    this.rAFId = -1
  }

  /**
   * Get piece component
   * @param  {String}          piece
   * @return {React.Component}
   */
  getPieceComponent (piece) {
    return this.pieceList[piece]
  }

  /**
   * Handle piece movement
   * @param {Object} notation
   */
  handleSelect = ({ side, piece, position }) => {
    this.setState(prevState => {
      const { notations, records } = prevState

      // get Piece component
      const Piece = this.getPieceComponent(piece)

      // assigned on each component
      const { movement } = Piece
      const { defaults, specials } = movement

      // undertand movement of Chess piece
      // every movement
      let movable = Chess.detectMovablePath({
        movement: defaults,
        specials,
        piece,
        position,
        side,
        records
      })

      // exclude blocked path
      movable = Chess.excludeBlockedPath({ notations, movable, specials })

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
  handleMove = (position) => {
    const turn = {
      w: 'b',
      b: 'w'
    }

    this.setState(prevState => {
      const { notations, selected } = prevState
      const nextNotations = notations.map(n => {
        let nextNotation = n

        if (n.search(selected) > -1) {
          const { side, piece } = Chess.parseNotation(n)

          nextNotation = `${side}${piece}${position}`

          // passing prop to show moving animation
          // TODO
          // get rid of it if it fires side effect
          // re-implement
          this.translated = {
            notation: nextNotation,
            axis: Chess.convertAxis(n, nextNotation)
          }
        }

        return nextNotation
      })

      return {
        notations: nextNotations,
        turn: turn[prevState.turn],
        records: Chess.records(prevState.records, notations, nextNotations),
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
    const pretendMoving = () => (el.style.cssText = 'top: 0; right: 0;')
    let style = ''

    if (axis.x !== 0) {
      style = `${style}right: ${axis.x}px;`
    }

    if (axis.y !== 0) {
      style = `${style}top: ${axis.y}px;`
    }

    el.style.cssText = style

    if (this.rAFId) {
      window.cancelAnimationFrame(this.rAFId)
    }

    this.rAFId = window.requestAnimationFrame(pretendMoving)
  }

  /**
   * Lifecycle method
   * @param {Object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    const { actions } = nextProps
    const { records } = this.state

    if (actions === 'undo') {
      const turn = {
        w: 'b',
        b: 'w'
      }

      const { undoRecords, undoNotations } = Chess.undo({ records, counts: 0.5 })

      if (undoRecords) {
        this.setState(prevState => ({ records: undoRecords, notations: undoNotations, turn: turn[prevState.turn] }))
      }
    }
  }

  /**
   * Lifecycle method
   */
  componentDidUpdate () {
    this.translated = null
  }

  /**
   * Lifecycle method
   */
  componentWillUnmount () {
    window.cancelAnimationFrame(this.rAFId)
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { notations, turn, movable, selected, records } = this.state
    const parsedMovable = flatten(movable)

    return [
      <div key="body" className={css.board}>
        {
          Chess.RANKS.map(rank => (
            <div key={rank} className={cx(css.rank, 'l-flex-row')}>
              {
                Chess.FILES.map(file => {
                  const position = `${file}${rank}`
                  const currentNotation = Chess.findNotation({ notations, position })
                  const { side, piece } = Chess.parseNotation(currentNotation)
                  const Piece = this.getPieceComponent(piece)
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
      <div key="footer">
        {isExist(records) && <Records records={records} />}
        <Turn turn={turn} />
      </div>
    ]
  }
}

export default Board
