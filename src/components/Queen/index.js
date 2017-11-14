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
