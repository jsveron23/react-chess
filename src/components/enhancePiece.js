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
      turn: PropTypes.string.isRequired,
      tileName: PropTypes.string.isRequired,
      selectPiece: PropTypes.func.isRequired,
      selected: PropTypes.string
    }

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const { turn, tileName, selectPiece } = this.props
      const isTurn = side === turn

      if (isTurn) {
        selectPiece(`${tileName}-${key}`)
      }
    }

    render () {
      const { turn, tileName, selected } = this.props
      const cls = cx({
        'is-turn': side === turn,
        'is-selected': selected === `${tileName}-${key}`
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          <WrappedComponent />
        </div>
      )
    }
  }

  return Piece
}

export default enhancePiece
