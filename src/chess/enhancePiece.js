import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'ramda'
import { noop } from '~/utils'
import { getMovableAxis } from '~/chess/core'
import { getSide, parseSelected } from '~/chess/helpers'

/**
 * Higher order component for Chess piece
 * @see getPiece.js
 * @param  {Component} WrappedComponent svg-react-loader
 * @param  {string}    staticKey
 * @param  {string}    staticTurn
 * @return {Component}
 */
function enhancePiece (WrappedComponent, staticKey, staticTurn) {
  const Piece = (props) => {
    const {
      turn,
      tile,
      piece,
      selected,
      lineup,
      isMovable,
      // setLineup,
      setSelected,
      setMovableAxis
    } = props
    const {
      side: selectedSide,
      piece: selectedPiece,
      file: selectedFile,
      rank: selectedRank
    } = parseSelected(selected, lineup)
    const id = `${tile}-${staticTurn}`
    const isTurn = getSide(staticTurn) === turn
    const isSelected = selected === id
    const ignoreCapture = selectedSide !== staticTurn && selectedPiece === 'P'
    const isCapturable = isMovable && !isTurn && !ignoreCapture
    const cls = cx({
      'is-turn': isTurn,
      'is-selected': isSelected,
      'is-capturable': isCapturable
    })

    function handleClick (evt) {
      evt.preventDefault()

      if (isTurn) {
        setSelected(id)

        compose(
          setMovableAxis, // -> redux/action
          getMovableAxis(tile, piece) // -> chess/core
        )(turn)
      }

      if (!isTurn && isMovable) {
        // capture
        const by = `${selectedSide}${selectedPiece}${selectedFile}${selectedRank}`
        const gotcha = `${staticTurn}${piece}${tile}`

        console.log('by: ', by)
        console.log('captured: ', gotcha)

        // TODO: after captured -> apply to score sheet
        // setLineup()
      }
    }

    return (
      <div className={cls} onClick={handleClick}>
        {/* TODO: need unique key (include tile name) */}
        <WrappedComponent key={staticKey} />
      </div>
    )
  }

  Piece.displayName = `enhancePiece(${WrappedComponent.name})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    lineup: PropTypes.array.isRequired,
    piece: PropTypes.string,
    selected: PropTypes.string,
    isMovable: PropTypes.bool,
    setLineup: PropTypes.func,
    setSelected: PropTypes.func,
    setMovableAxis: PropTypes.func
  }

  Piece.defaultProps = {
    isMovable: false,
    setLineup: noop,
    setSelected: noop,
    setMovableAxis: noop
  }

  return Piece
}

export default enhancePiece
