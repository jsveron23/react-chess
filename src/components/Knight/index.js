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

  static movement = {
    defaults: {
      jumpover: [
        [[-1, 2], [1, 2], [-1, -2], [1, -2]],
        [[-2, 1], [2, 1], [-2, -1], [2, -1]]
      ]
    },
    specials: ['jumpover']
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
    const viewBox = Knight.coord[side]
    const src = `svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`

    return <img ref={this.refContainer} src={src} alt="Knight" className={css.knight} />
  }
}

Knight.propTypes = {
  side: PropTypes.string.isRequired
}

export default Knight
