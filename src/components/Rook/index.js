import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './rook.css'

/**
 * Rook component
 * @extends {React.PureComponent}
 */
class Rook extends PureComponent {
  static movement = {
    defaults: {
      vertical: [
        [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]],
        [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
      ]
    },
    specials: []
  }

  /**
   * Get ref
   * @param {Object} el
   */
  refContainer = el => {
    this.refElement = el
  }

  /**
   * Lifecycle method
   */
  componentDidMount () {
    const { translated, doAnimate } = this.props

    if (translated) {
      const { axis } = translated

      doAnimate(axis, this.refElement)
    }
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { side } = this.props

    return (
      <svg
        ref={this.refContainer}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="45"
        height="45"
        viewBox="0 0 45 45"
        aria-labelledby="title"
      >
        <title id={`rook-${side}`}>Rook({side})</title>
        <g className={css.rook} style={{ fill: side === 'w' ? '#ffffff' : '#000000' }}>
          <path
            d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
            style={{ strokeLinecap: 'butt' }} />
          <path
            d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
            style={{ strokeLinecap: 'butt' }} />
          <path
            d="M 11,14 L 34,14"
            style={{
              fill: 'none',
              stroke: side === 'w' ? '#000000' : '#ffffff',
              strokeWidth: 1,
              strokeLinejoin: 'miter'
            }} />
          {
            side === 'w'
              ? [
                <path
                  key="wpr1"
                  d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
                  style={{ strokeLinecap: 'butt' }} />,
                <path
                  key="wpr2"
                  d="M 34,14 L 31,17 L 14,17 L 11,14" />,
                <path
                  key="wpr3"
                  d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
                  style={{ strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />,
                <path
                  key="wpr4"
                  d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
              ]
              : [
                <path
                  key="bpr1"
                  d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
                  style={{ strokeLinecap: 'butt' }} />,
                <path
                  key="bpr2"
                  d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
                  style={{ strokeLinecap: 'butt', strokeLinejoin: 'miter' }} />,
                <path
                  key="bpr3"
                  d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
                  style={{ strokeLinecap: 'butt' }} />,
                <path
                  key="bpr4"
                  d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
                  style={{ strokeLinecap: 'butt' }} />,
                <path
                  key="bpr5"
                  d="M 12,35.5 L 33,35.5 L 33,35.5"
                  style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1, strokeLinejoin: 'miter' }} />,
                <path
                  key="bpr6"
                  d="M 13,31.5 L 32,31.5"
                  style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1, strokeLinejoin: 'miter' }} />,
                <path
                  key="bpr7"
                  d="M 14,29.5 L 31,29.5"
                  style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1, strokeLinejoin: 'miter' }} />,
                <path
                  key="bpr8"
                  d="M 14,16.5 L 31,16.5"
                  style={{ fill: 'none', stroke: '#ffffff', strokeWidth: 1, strokeLinejoin: 'miter' }} />
              ]
          }
        </g>
      </svg>
    )
  }
}

Rook.propTypes = {
  side: PropTypes.string.isRequired,
  translated: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  doAnimate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ])
}
Rook.defaultProps = {
  translated: null,
  doAnimate: function () {}
}

export default Rook
