import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { boundMethod } from 'autobind-decorator'
import cx from 'classnames'
import { SIDE } from '~/constants'

function enhancePiece (WrappedComponent, key) {
  const side = Object.freeze(SIDE[key.slice(0, 1)])

  class Piece extends Component {
    static displayName = `enhancePiece(${key})`

    static propTypes = {
      turn: PropTypes.string.isRequired
    }

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const { turn } = this.props
      const isTurn = side === turn

      if (isTurn) {
        // do action
      }
    }

    render () {
      const { turn } = this.props
      const isTurn = side === turn

      return (
        <div className={cx({ 'is-turn': isTurn })} onClick={this.handleClick}>
          <WrappedComponent />
        </div>
      )
    }
  }

  return Piece
}

export default enhancePiece
