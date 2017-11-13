import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './bishop.css'

/**
 * Bishop component
 * @extends {React.PureComponent}
 */
class Bishop extends PureComponent {
  static coord = {
    w: [90, 0, 45, 45],
    b: [90, 45, 45, 45]
  }

  static movement = [
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
    const viewBox = Bishop.coord[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="Bishop"
        className={css.bishop}
      />
    )
  }
}

Bishop.propTypes = {
  side: PropTypes.string.isRequired
}

export default Bishop
