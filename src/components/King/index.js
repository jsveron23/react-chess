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

  static movement = {
    defaults: {
      vertical: [
        [[1, 0]],
        [[-1, 0]]
      ],

      horizontal: [
        [[0, 1]],
        [[0, -1]]
      ],

      dragonal: [
        [[1, 1]],
        [[1, -1]],
        [[-1, -1]],
        [[-1, 1]]
      ]
    },
    specials: ['castling']
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
    const viewBox = King.coord[side]
    const src = `svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`

    return <img ref={this.refContainer} src={src} alt="King" className={css.king} />
  }
}

King.propTypes = {
  side: PropTypes.string.isRequired
}

export default King
