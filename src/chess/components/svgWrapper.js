import React from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import cx from 'classnames'
import * as R from 'ramda'
import { noop } from '~/utils'
import { getSide } from '~/chess/helper'
import useAnimation from './useAnimation'

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
function svgWrapper (WrappedComponent, staticKey, staticTurn) {
  const Piece = (props) => {
    const {
      turn,
      tile,
      selectedKey,
      selectedTile,
      checkTo,
      isMovable,
      animate,
      setNextMovableAxis,
      setNextCapturedSnapshot
    } = props

    const style = useAnimation(animate, tile)
    const isTurn = getSide(staticTurn) === turn
    const isCapturable = isMovable && !isTurn
    const cls = cx('wrapper', {
      'is-turn': isTurn,
      'is-capturable': isCapturable,
      'is-selected': selectedTile === tile,
      'is-check-tile': checkTo === tile
    })

    function handleClick (evt) {
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
    }

    return (
      <animated.div style={style} className={cls} onClick={handleClick}>
        <WrappedComponent
          key={`${staticKey}-${tile}`}
          className={cx({ 'is-check-piece': checkTo === tile })}
        />
      </animated.div>
    )
  }

  Piece.displayName = `svgWrapper(${WrappedComponent.name})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    selectedKey: PropTypes.string,
    selectedTile: PropTypes.string,
    checkTo: PropTypes.string,
    isMovable: PropTypes.bool,
    animate: PropTypes.object,
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

export default R.curry(svgWrapper)
