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
    const viewBox = Rook.coord[side]
    const src = `svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`

    return <img ref={this.refContainer} src={src} alt="Rook" className={css.rook} />
  }
}

Rook.propTypes = {
  side: PropTypes.string.isRequired
}

export default Rook
