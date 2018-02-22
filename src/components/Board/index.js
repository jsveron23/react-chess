import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Rank,
  File
} from '@components'
import { getPiece } from '@pieces'
import Chess, {
  RANKS,
  FILES
} from '@utils/Chess'
import css from './board.css'

class Board extends Component {
  static propTypes = {
    isMoving: PropTypes.bool.isRequired,
    notations: PropTypes.array.isRequired,
    turn: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    movable: PropTypes.array,
    translated: PropTypes.object,
    check: PropTypes.string,
    onSelect: PropTypes.func,
    onMove: PropTypes.func,
    onAnimateEnd: PropTypes.func,
    onAnimate: PropTypes.func
  }

  static defaultProps = {
    movable: [],
    check: '',
    onSelect: function () {},
    onMove: function () {},
    onAnimateEnd: function () {},
    onAnimate: function () {}
  }

  shouldComponentUpdate (nextProps) {
    const prevProps = this.props
    const {
      notations,
      selected
    } = nextProps
    const findNotation = Chess.findNotation(notations)
    const prevNotation = findNotation(prevProps.selected)
    const nextNotation = findNotation(selected)
    const shouldNotUpdate = (
      prevNotation !== nextNotation
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
    const len = RANKS.length

    return (
      <div className={css.board}>
        {RANKS.map((rank, idx) => (
          <Rank key={rank} name={len - idx}>
            {FILES.map((file) => {
              const position = `${file}${rank}`
              const currentNotation = findNotation(position)
              const { side, piece } = Chess.parseNotation(currentNotation)
              const EnhancedPiece = getPiece(piece)
              const shouldAnimate = (translated && translated.notation === currentNotation)
              const fileProps = {
                ...defProps,
                name: file,
                shouldAnimate,
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
