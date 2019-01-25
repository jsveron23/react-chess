import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { getSideBy } from '~/utils/chess'

function enhancePiece (key) {
  return (WrappedComponent) => {
    const Piece = ({ turn, tileName, selected, selectPiece }) => {
      const isTurn = getSideBy(key) === turn
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
}

export default enhancePiece
