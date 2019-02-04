import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { compose } from 'ramda'
import { noop } from '~/utils'
import { getAxis } from '~/chess/core'
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
  class Piece extends Component {
    static displayName = `enhancePiece(${staticKey})`

    static propTypes = {
      turn: PropTypes.string.isRequired,
      tile: PropTypes.string.isRequired,
      piece: PropTypes.string,
      selected: PropTypes.string,
      isMovable: PropTypes.bool,
      selectPiece: PropTypes.func,
      setCurrentMovable: PropTypes.func
    }

    static defaultProps = {
      isMovable: false,
      selectPiece: noop,
      setCurrentMovable: noop
    }

    render () {
      const { turn, tile, selected } = this.props
      const isTurn = getSide(staticTurn) === turn
      const id = `${tile}-${staticTurn}`
      const cls = cx({
        'is-turn': isTurn,
        'is-selected': selected === id
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          <WrappedComponent key={staticKey} />
        </div>
      )
    }

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const { turn, tile, selectPiece, piece, setCurrentMovable } = this.props
      const isTurn = getSide(staticTurn) === turn

      if (isTurn) {
        selectPiece(`${tile}-${staticTurn}`)

        compose(
          setCurrentMovable,
          getAxis(tile, piece)
        )(turn)
      }
    }
  }

  return Piece
}

export default enhancePiece
