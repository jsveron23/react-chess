import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { boundMethod } from 'autobind-decorator'
import { curry } from 'ramda'
import { noop } from '~/utils'
import { getSide, createTile } from '~/chess/helpers'

/**
 * Higher order component for Chess piece
 * - Chess pieces from svg loader
 * - that is not defining prop types, events and life cycle methods
 * @see getPiece.js
 * @param  {Component} WrappedComponent svg-react-loader
 * @param  {string}    staticKey
 * @param  {string}    staticTurn
 * @return {Component}
 */
function enhancePiece (WrappedComponent, staticKey, staticTurn) {
  class Piece extends Component {
    static displayName = `enhancePiece(${WrappedComponent.name})`

    static propTypes = {
      turn: PropTypes.string.isRequired,
      tile: PropTypes.string.isRequired,
      selectedPiece: PropTypes.string,
      selectedSide: PropTypes.string,
      selectedFile: PropTypes.string,
      selectedRank: PropTypes.string,
      checkTo: PropTypes.string,
      isMovable: PropTypes.bool,
      setNextMovableAxis: PropTypes.func,
      setNextCapturedSnapshot: PropTypes.func
    }

    static defaultProps = {
      isMovable: false,
      setNextMovableAxis: noop,
      setNextCapturedSnapshot: noop
    }

    getSelectedTile = memoize(createTile)

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const {
        isMovable,
        turn,
        tile,
        selectedPiece,
        selectedSide,
        selectedFile,
        selectedRank,
        setNextMovableAxis,
        setNextCapturedSnapshot
      } = this.props

      const selectedTile = this.getSelectedTile(selectedFile, selectedRank)
      const isTurn = getSide(staticTurn) === turn
      const isCapturable = isMovable && !isTurn

      if (isTurn) {
        setNextMovableAxis(tile)
      }

      if (isCapturable) {
        const code = `${selectedSide}${selectedPiece}${tile}`

        setNextCapturedSnapshot({
          selectedTile,
          capturedTile: tile,
          nextCode: code
        })
      }
    }

    render () {
      const {
        turn,
        tile,
        selectedFile,
        selectedRank,
        checkTo,
        isMovable
      } = this.props
      const selectedTile = this.getSelectedTile(selectedFile, selectedRank)
      const isTurn = getSide(staticTurn) === turn
      const isCapturable = isMovable && !isTurn
      const cls = cx({
        'is-turn': isTurn,
        'is-capturable': isCapturable,
        'is-selected': selectedTile === tile,
        'is-check-tile': checkTo === tile
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          <WrappedComponent
            key={`${staticKey}-${tile}`}
            className={cx({ 'is-check-piece': checkTo === tile })}
          />
        </div>
      )
    }
  }

  return Piece
}

export default curry(enhancePiece)
