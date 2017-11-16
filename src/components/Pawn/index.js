import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './pawn.css'

/**
 * Pawn component
 * @extends {React.PureComponent}
 */
class Pawn extends PureComponent {
  static coord = {
    w: [225, 0, 45, 45],
    b: [225, 45, 45, 45]
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props
    const viewBox = Pawn.coord[side]
    const src = `svg/Chess_Pieces.svg#svgView(viewBox(${viewBox}))`

    return <img src={src} alt="Pawn" className={css.pawn} />
  }
}

Pawn.propTypes = {
  side: PropTypes.string.isRequired
}

export default Pawn
