import React from 'react'
import PropTypes from 'prop-types'
import { Rank, File } from '@components'
import { getPiece } from '@pieces'
import Chess, { RANKS, FILES } from '@utils/Chess'
import css from './board.css'

/**
 * Chess Board component
 * @param  {Object} props
 * @return {JSX}
 */
const Board = ({
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
}) => {
  const findNotation = Chess.findNotation(notations)
  const defProps = {
    movable,
    selected,
    turn,
    onSelect,
    onMove
  }

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
              side: Chess.getSide(side),
              position,
              piece
            }

            return (
              <File key={position} {...fileProps}>
                {EnhancedPiece && (
                  <EnhancedPiece
                    side={side}
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

Board.propTypes = {
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
Board.defaultProps = {
  movable: [],
  check: ''
}

export default Board
