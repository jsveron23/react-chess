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
      isMovable,
      setMovable,
      setCapturedNext
    } = props
    const selectedTile = `${selectedFile}${selectedRank}`
    const isTurn = getSide(staticTurn) === turn
    const isCapturable = isMovable && !isTurn
    const cls = cx({
      'is-turn': isTurn,
      'is-capturable': isCapturable,
      'is-selected': selectedTile === tile
    })

    // pressing a piece
    function handleClick (evt) {
      evt.preventDefault()

      if (isTurn) {
        setMovable({ tile, staticTurn, piece })
      }

      if (isCapturable) {
        setCapturedNext({
          capturedTile: tile,
          selectedTile: selectedTile,
          replaceSnapshotItem: `${selectedSide}${selectedPiece}${tile}`
        })
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
    piece: PropTypes.string,
    selectedPiece: PropTypes.string,
    selectedSide: PropTypes.string,
    selectedFile: PropTypes.string,
    selectedRank: PropTypes.string,
    isMovable: PropTypes.bool,
    setMovable: PropTypes.func,
    setCapturedNext: PropTypes.func
  }

  Piece.defaultProps = {
    isMovable: false,
    setMovable: noop,
    setCapturedNext: noop
  }

  return Piece
}

export default curry(enhancePiece)
