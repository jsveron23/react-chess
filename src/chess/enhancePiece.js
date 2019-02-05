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
      setSelected: PropTypes.func,
      setMovableTiles: PropTypes.func
    }

    static defaultProps = {
      isMovable: false,
      setSelected: noop,
      setMovableTiles: noop
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

      const { turn, tile, piece, setSelected, setMovableTiles } = this.props
      const isTurn = getSide(staticTurn) === turn

      if (isTurn) {
        setSelected(`${tile}-${staticTurn}`)

        compose(
          setMovableTiles,
          getAxis(tile, piece)
        )(turn)
      }
    }
  }

  return Piece
}

export default enhancePiece
