import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { curry } from 'ramda'
import { noop } from '~/utils'
import { getSide } from '~/chess/helpers'

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
      selectedPiece,
      selectedSide,
      selectedFile,
      selectedRank,
      // lineup,
      isMovable,
      // setLineup
      setMovable
    } = props
    const selectedTile = `${selectedFile}${selectedRank}`
    const isTurn = getSide(staticTurn) === turn
    const isSelected = selectedTile === tile
    const ignoreCapture = selectedPiece === 'P' && selectedSide !== staticTurn
    const isCapturable = isMovable && !isTurn && !ignoreCapture
    const cls = cx({
      'is-turn': isTurn,
      'is-selected': isSelected,
      'is-capturable': isCapturable
    })

    // pressing a piece
    function handleClick (evt) {
      evt.preventDefault()

      if (isTurn) {
        setMovable({ tile, staticTurn, piece })
      }

      if (isCapturable) {
        // capture
        const by = `${selectedSide}${selectedPiece}${selectedTile}`
        const gotcha = `${staticTurn}${piece}${tile}`

        console.log('by: ', by)
        console.log('captured: ', gotcha)

        // TODO: after captured -> apply to score sheet
        // setLineup()
      }
    }

    return (
      <div className={cls} onClick={handleClick}>
        <WrappedComponent key={`${staticKey}-${tile}`} />
      </div>
    )
  }

  Piece.displayName = `enhancePiece(${WrappedComponent.name})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    lineup: PropTypes.array.isRequired,
    piece: PropTypes.string,
    selectedPiece: PropTypes.string,
    selectedSide: PropTypes.string,
    selectedFile: PropTypes.string,
    selectedRank: PropTypes.string,
    isMovable: PropTypes.bool,
    setLineup: PropTypes.func,
    setMovable: PropTypes.func
  }

  Piece.defaultProps = {
    isMovable: false,
    setLineup: noop,
    setMovable: noop
  }

  return Piece
}

export default curry(enhancePiece)
