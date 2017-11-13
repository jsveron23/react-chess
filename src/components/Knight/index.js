import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './knight.css'

/**
 * Knight component
 * @extends {React.PureComponent}
 */
class Knight extends PureComponent {
  static coord = {
    w: [135, 0, 45, 45],
    b: [135, 45, 45, 45]
  }

  static movement = [
    [-1, 2], [1, 2], [-1, -2], [1, -2],
    [-2, 1], [2, 1], [-2, -1], [2, -1]
  ]

  static specials = ['jump']

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = Knight.coord[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="knight"
        className={css.knight}
      />
    )
  }
}

Knight.propTypes = {
  side: PropTypes.string.isRequired
}

export default Knight
