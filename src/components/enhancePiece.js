import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { SIDE } from '~/constants'

function enhancePiece (WrappedComponent, key) {
  const side = SIDE[key.slice(0, 1)]

  const Piece = ({ turn, tileName, selected, selectPiece }) => {
    const isTurn = side === turn
    const id = `${tileName}-${key}`
    const cls = cx({
      'is-turn': isTurn,
      'is-selected': selected === id
    })

    const handleClick = (evt) => {
      evt.preventDefault()

      if (isTurn) {
        selectPiece(id)
      }
    }

    return (
      <div className={cls} onClick={handleClick}>
        <WrappedComponent />
      </div>
    )
  }

  Piece.displayName = `enhancePiece(${key})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tileName: PropTypes.string.isRequired,
    selectPiece: PropTypes.func.isRequired,
    selected: PropTypes.string
  }

  return Piece
}

export default enhancePiece
