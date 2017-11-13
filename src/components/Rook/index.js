import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './rook.css'

/**
 * Rook component
 * @extends {React.PureComponent}
 */
class Rook extends PureComponent {
  static coord = {
    w: [180, 0, 45, 45],
    b: [180, 45, 45, 45]
  }

  static movement = [
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]
  ]

  static specials = []

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = Rook.coord[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="Rook"
        className={css.rook}
      />
    )
  }
}

Rook.propTypes = {
  side: PropTypes.string.isRequired
}

export default Rook
