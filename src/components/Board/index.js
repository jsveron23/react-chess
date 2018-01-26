import React from 'react'
import PropTypes from 'prop-types'
import { Rank, File } from '@components'
import { getPiece } from '@pieces'
import { deepFlatten } from '@utils'
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
  turn,
  translated,
  onSelect,
  onMove,
  onAnimate,
  onAnimateEnd
}) => {
  const {
    findNotation,
    parseNotation,
    getSide
  } = Chess
  const find = findNotation(notations)
  const defProps = {
    movable: deepFlatten(movable),
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
            const currentNotation = find(position)
            const { side, piece } = parseNotation(currentNotation)
            const EnhancedPiece = getPiece(piece)
            const shouldAnimate = (translated && translated.notation === currentNotation)
            const fileProps = {
              ...defProps,
              side: getSide(side),
              position,
              piece
            }

            return (
              <File key={position} {...fileProps}>
                {EnhancedPiece && (
                  <EnhancedPiece
                    side={side}
                    translated={shouldAnimate && translated}
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
  translated: PropTypes.object
}
Board.defaultProps = {
  movable: []
}

export default Board
