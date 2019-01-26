import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { boundMethod } from 'autobind-decorator'
import { getSideBy, getMovementsTiles } from '~/utils/chess'

function enhancePiece (WrappedComponent, key) {
  // TODO: shouldComponentUpdate
  class Piece extends Component {
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
      const isTurn = getSideBy(key) === turn
      const id = `${tileName}-${key}`

      if (isTurn) {
        const mvs = getMovementsTiles(tileName)(piece)(turn)

        selectPiece(id)
        setCurrentMovable(mvs)
      }
    }

    render () {
      const { turn, tileName, selected } = this.props
      const isTurn = getSideBy(key) === turn
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
  }

  Piece.displayName = `enhancePiece(${key})`

  Piece.propTypes = {
    turn: PropTypes.string.isRequired,
    tileName: PropTypes.string.isRequired,
    piece: PropTypes.string,
    selected: PropTypes.string,
    selectPiece: PropTypes.func,
    setCurrentMovable: PropTypes.func
  }

  Piece.defaultProps = {
    selectPiece: function () {},
    setCurrentMovable: function () {}
  }

  return Piece
}

export default enhancePiece
