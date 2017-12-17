import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { File, Turn, Records } from '@components'
import { getPiece } from '@pieces'
import * as Utils from '@utils'
import Chess from '@utils/Chess'
import css from './board.css'

/**
 * Chess Board component
 * @extends {React.Component}
 */
class Board extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
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
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      notations: props.notations,
      turn: 'w',
      selected: '',
      isMoving: false,
      movable: [],
      records: []
    }

    // TODO no alias, into Chess.js
    this.enemy = {
      w: 'b',
      b: 'w'
    }

    // instant data
    // reset per update
    this.translated = null

    // requestAnimationFrame
    this.rAFId = -1
  }

  /**
   * Handle piece movement
   * ; after selecting = before moving
   * @param {Object} notation
   */
  handleSelect = ({ side, piece, position }) => {
    this.setState(prevState => {
      const { movement } = getPiece(piece)
      const { defaults, specials } = movement

      // every movement
      let movable = Chess.detectMovablePath({ ...prevState, side, piece, position, specials, movement: defaults })

      // exclude blocked path
      movable = Chess.excludeBlockedPath({ ...prevState, movable, specials })

      return {
        selected: position,
        movable
      }
    })
  }

  /**
   * Handle after moving
   * ; animatiom start
   * @param {String} nextPosition
   */
  handleMove = nextPosition => {
    this.setState(prevState => {
      const { notations, selected, turn, records } = prevState
      const nextNotations = notations.map(prevNotation => {
        let nextNotation = prevNotation

        if (prevNotation.search(selected) > -1) {
          const { side, piece } = Chess.parseNotation({ notation: prevNotation })

          nextNotation = `${side}${piece}${nextPosition}`

          // passing prop to show moving animation
          // TODO
          // get rid of it if it fires side effect
          // re-implement
          this.translated = {
            notation: nextNotation,
            axis: Chess.convertAxis({ prev: prevNotation, next: nextNotation })
          }
        }

        return nextNotation
      })

      return {
        notations: nextNotations,
        turn: this.enemy[turn],
        records: Chess.records({ records, prevNotations: notations, nextNotations }),
        isMoving: true,
        selected: '',
        movable: []
      }
    })
  }

  /**
   * Fire after finishing transition
   * ; after moving
   * @param {String} piece
   */
  handleAnimateEnd = (piece) => {
    this.setState(prevState => {
      const { notations, records, selected } = prevState
      let nextNotations = [...notations]

      if (Utils.isEmpty(selected) && piece === 'P') {
        nextNotations = Chess.transformTo({ notations, records, action: 'promotion' })
      }

      return {
        isMoving: false,
        notations: nextNotations
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
    const { action } = nextProps
    const { records, turn } = this.state
    const state = {}

    if (action === 'undo') {
      const { undoRecords, undoNotations } = Chess.undo({ records, counts: 0.5 })

      if (undoRecords) {
        state.records = undoRecords
        state.notations = undoNotations
        state.turn = this.enemy[turn]
      }
    }

    this.setState(state)
  }

  /**
   * Lifecycle method
   * @param {Object} nextProps
   * @param {Object} prevState
   */
  componentDidUpdate (prevProps, prevState) {
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
    const parsedMovable = Utils.flatten(movable)

    return (
      <Fragment>
        <div className={css.board}>
          {
            Chess.RANKS.map(rank => (
              <div key={rank} className={cx(css.rank, 'l-flex-row')}>
                {
                  Chess.FILES.map(file => {
                    const position = `${file}${rank}`
                    const currentNotation = Chess.findNotation({ notations, position })
                    const { side, piece } = Chess.parseNotation({ notation: currentNotation })
                    const EnhancedPiece = getPiece(piece)
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
                          EnhancedPiece && (
                            <EnhancedPiece
                              side={side}
                              translated={shouldAnimate && this.translated}
                              doAnimate={shouldAnimate && this.handleAnimate}
                              onAnimateEnd={this.handleAnimateEnd}
                            />
                          )
                        }
                      </File>
                    )
                  })
                }
              </div>
            ))
          }
        </div>
        {Utils.isExist(records) && <Records records={records} />}
        <Turn turn={turn} />
      </Fragment>
    )
  }
}

export default Board
