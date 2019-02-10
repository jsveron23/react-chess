import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { compose } from 'ramda'
import { noop } from '~/utils'
import { getMovableAxis } from '~/chess/core'
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
  const originalDisplayName = WrappedComponent.name

  class Piece extends Component {
    static displayName = `enhancePiece(${originalDisplayName})`

    static propTypes = {
      turn: PropTypes.string.isRequired,
      tile: PropTypes.string.isRequired,
      piece: PropTypes.string,
      selected: PropTypes.string,
      isMovable: PropTypes.bool,
      setSelected: PropTypes.func,
      setMovableAxis: PropTypes.func
    }

    static defaultProps = {
      isMovable: false,
      setSelected: noop,
      setMovableAxis: noop
    }

    render () {
      const { turn, tile, selected, isMovable } = this.props
      const id = `${tile}-${staticTurn}`
      const isTurn = getSide(staticTurn) === turn
      const isSelected = selected === id
      const isCapturable = isMovable && !isTurn
      const cls = cx({
        'is-turn': isTurn,
        'is-selected': isSelected,
        'is-capturable': isCapturable
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          {/* TODO: need unique key (include tile name) */}
          <WrappedComponent key={staticKey} />
        </div>
      )
    }

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const { turn, tile, piece, setSelected, setMovableAxis } = this.props
      const isTurn = getSide(staticTurn) === turn

      if (isTurn) {
        // move

        setSelected(`${tile}-${staticTurn}`)

        compose(
          setMovableAxis,
          getMovableAxis(tile, piece)
        )(turn)
      } else {
        // capture

        // TODO: edit excludeBlock if not same turn, leave it as the path
        console.log('capture', tile)
      }
    }
  }

  return Piece
}

export default enhancePiece
