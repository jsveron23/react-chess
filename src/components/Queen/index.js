import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './queen.css'

/**
 * Queen component
 * @extends {React.PureComponent}
 */
class Queen extends PureComponent {
  static coord = {
    w: [45, 0, 45, 45],
    b: [45, 45, 45, 45]
  }

  static movement = [
    // vertical
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
    [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0],

    // horizontal
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7],

    // dragonal
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7],
    [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7],
    [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7],
    [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]
  ]

  static specials = []

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = Queen.coord[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="Queen"
        className={css.queen}
      />
    )
  }
}

Queen.propTypes = {
  side: PropTypes.string.isRequired
}

export default Queen
