import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './king.css'

/**
 * King component
 * @extends {React.PureComponent}
 */
class King extends PureComponent {
  static coord = {
    w: [0, 0, 45, 45],
    b: [0, 45, 45, 45]
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = King.coord[side]

    return (
      <img
        src={`svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`}
        alt="King"
        className={css.king}
      />
    )
  }
}

King.propTypes = {
  side: PropTypes.string.isRequired
}

export default King
