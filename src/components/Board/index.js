import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rank, File } from '@components'
import { getPiece } from '@pieces'
import { isEmpty, isDiff } from '@utils'
import Chess, { RANKS, FILES } from '@utils/Chess'
import css from './board.css'

class Board extends Component {
  static propTypes = {
    isMoving: PropTypes.bool.isRequired,
    notations: PropTypes.array.isRequired,
    turn: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onAnimateEnd: PropTypes.func.isRequired,
    onAnimate: PropTypes.func.isRequired,
    movable: PropTypes.array,
    translated: PropTypes.object,
    check: PropTypes.string
  }

  static defaultProps = {
    movable: [],
    check: ''
  }

  shouldComponentUpdate (nextProps) {
    const prevProps = this.props
    const {
      turn,
      check,
      selected,
      movable,
      notations
    } = nextProps
    const diffNotations = isDiff(notations)
    const diffMovable = isDiff(movable)
    const isNotationsEqual = !diffNotations(prevProps.notations)
    const isMovableEqual = !diffMovable(prevProps.movable)
    const shouldNotUpdate = (
      isEmpty(check) &&
      isNotationsEqual &&
      isMovableEqual &&
      prevProps.turn === turn &&
      prevProps.selected === selected
    )

    if (shouldNotUpdate) {
      return false
    }

    return true
  }

  render () {
    const {
      isMoving,
      notations,
      movable,
      selected,
      check,
      turn,
      translated,
      onSelect,
      onMove,
      onAnimate,
      onAnimateEnd
    } = this.props
    const defProps = {
      isMoving,
      movable,
      selected,
      turn,
      check,
      onSelect,
      onMove
    }
    const findNotation = Chess.findNotation(notations)

    return (
      <div className={css.board}>
        {RANKS.map(rank => (
          <Rank key={rank}>
            {FILES.map(file => {
              const position = `${file}${rank}`
              const currentNotation = findNotation(position)
              const { side, piece } = Chess.parseNotation(currentNotation)
              const EnhancedPiece = getPiece(piece)
              const shouldAnimate = (translated && translated.notation === currentNotation)
              const fileProps = {
                ...defProps,
                side,
                position,
                piece
              }

              return (
                <File key={position} {...fileProps}>
                  {EnhancedPiece && (
                    <EnhancedPiece
                      alias={Chess.getAlias(side)}
                      check={check === currentNotation ? check : ''}
                      translated={shouldAnimate ? translated : {}}
                      onAnimate={shouldAnimate && onAnimate}
                      onAnimateEnd={onAnimateEnd}
                    />
                  )}
                </File>
              )
            })}
          </Rank>
        ))}
      </div>
    )
  }
}

export default Board
