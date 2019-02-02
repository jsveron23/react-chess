import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { noop } from '~/utils'
import { getSide, getAxis } from '~/chess/libs'

function enhancePiece (WrappedComponent, key) {
  // TODO: shouldComponentUpdate
  class Piece extends Component {
    static displayName = `enhancePiece(${key})`

    static propTypes = {
      turn: PropTypes.string.isRequired,
      tileName: PropTypes.string.isRequired,
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
      const { turn, tileName, selected } = this.props
      const isTurn = getSide(key) === turn
      const id = `${tileName}-${key}`
      const cls = cx({
        'is-turn': isTurn,
        'is-selected': selected === id
      })

      return (
        <div className={cls} onClick={this.handleClick}>
          <WrappedComponent />
        </div>
      )
    }

    @boundMethod
    handleClick (evt) {
      evt.preventDefault()

      const {
        turn,
        tileName,
        selectPiece,
        piece,
        setCurrentMovable
      } = this.props
      const isTurn = getSide(key) === turn
      const id = `${tileName}-${key}`

      if (isTurn) {
        const mvs = getAxis(tileName, piece, turn)

        selectPiece(id)
        setCurrentMovable(mvs)
      }
    }
  }

  return Piece
}

export default enhancePiece
