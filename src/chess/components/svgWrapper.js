import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import cx from 'classnames'
import * as R from 'ramda'
import { noop } from '~/utils'
import { getSide } from '~/chess/helpers'

const POSITION_DEFAULT = {
  top: 0,
  left: 0
}

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
  const staticSide = getSide(staticTurn)

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

    const key = useMemo(() => `${staticKey}-${tile}`, [tile])

    // return a memoized if provide `animate` data is always same
    const position = useMemo(() => {
      const reduceCb = (acc, key) => {
        const val = animate[key]

        if (key === 'tile' || val === 0) {
          return acc
        }

        return { ...acc, [key]: val }
      }

      return R.compose(
        R.reduce(reduceCb, POSITION_DEFAULT),
        R.keys
      )(animate)
    }, [animate])

    const measured = {
      from: { ...position },
      to: POSITION_DEFAULT
    }

    // get animation style
    const style = useSpring(measured)

    const isTurn = staticSide === turn
    const isCapturable = isMovable && !isTurn
    const isSelected = selectedTile === tile
    const isCheck = checkTo === tile

    const cls = cx('wrapper', {
      'is-turn': isTurn,
      'is-capturable': isCapturable,
      'is-selected': isSelected,
      'is-check-tile': isCheck
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
      <animated.div className={cls} style={style} onClick={handleClick}>
        <WrappedComponent key={key} className={cx({ 'is-check-piece': isCheck })} />
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
    animate: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number
    }),
    setNextMovableAxis: PropTypes.func,
    setNextCapturedSnapshot: PropTypes.func
  }

  Piece.defaultProps = {
    isMovable: false,
    animate: POSITION_DEFAULT,
    setNextMovableAxis: noop,
    setNextCapturedSnapshot: noop
  }

  return Piece
}

export default R.curry(svgWrapper)
