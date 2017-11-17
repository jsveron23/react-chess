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

  static movement = {
    defaults: {
      vertical: [
        [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
      ],

      horizontal: [
        [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
      ],

      dragonal: [
        [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
        [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
        [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
        [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]]
      ]
    },
    specials: []
  }

  /**
   * Get ref
   * @param {Object} el
   */
  refContainer = el => {
    this.refContainer = el
  }

  /**
   * Lifecycle method
   */
  componentDidMount () {
    const { translated, doAnimate } = this.props

    if (translated) {
      const { axis } = translated

      doAnimate(axis, this.refContainer)
    }
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = Queen.coord[side]
    const src = `svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`

    return <img ref={this.refContainer} src={src} alt="Queen" className={css.queen} />
  }
}

Queen.propTypes = {
  side: PropTypes.string.isRequired
}

export default Queen
