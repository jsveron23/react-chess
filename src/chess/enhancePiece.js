import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as R from 'ramda'
import { noop } from '~/utils'
import { getSide } from '~/chess/helper'

/**
 * Higher order component for Chess piece
 * - Chess pieces from svg loader
 * - that is not defining prop types, events and life cycle methods
 * @see getPiece.js
 * @param  {Component} WrappedComponent svg-react-loader
 * @param  {String}    staticKey
 * @param  {String}    staticTurn
 * @return {Component}
 */
function enhancePiece (WrappedComponent, staticKey, staticTurn) {
  const Piece = (props) => {
    const {
      turn,
      tile,
      selectedKey,
      selectedTile,
      checkTo,
      isMovable,
      setNextMovableAxis,
      setNextCapturedSnapshot
    } = props

    const isTurn = getSide(staticTurn) === turn
    const isCapturable = isMovable && !isTurn
    const cls = cx({
      'is-turn': isTurn,
      'is-capturable': isCapturable,
      'is-selected': selectedTile === tile,
      'is-check-tile': checkTo === tile
    })

    const handleClick = useCallback((evt) => {
      evt.preventDefault()

      if (isTurn) {
        setNextMovableAxis(tile)
      }

      if (isCapturable) {
        const code = `${selectedKey}${tile}`

        setNextCapturedSnapshot({
          selectedTile,
          capturedTile: tile,
          nextCode: code
        })
      }
    })

    return (
      <div className={cls} onClick={handleClick}>
        <WrappedComponent
          key={`${staticKey}-${tile}`}
          className={cx({ 'is-check-piece': checkTo === tile })}
        />
      </div>
    )
  }

  Piece.displayName = `enhancePiece(${WrappedComponent.name})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    selectedKey: PropTypes.string,
    selectedTile: PropTypes.string,
    checkTo: PropTypes.string,
    isMovable: PropTypes.bool,
    setNextMovableAxis: PropTypes.func,
    setNextCapturedSnapshot: PropTypes.func
  }

  Piece.defaultProps = {
    isMovable: false,
    setNextMovableAxis: noop,
    setNextCapturedSnapshot: noop
  }

  return Piece
}

export default R.curry(enhancePiece)
