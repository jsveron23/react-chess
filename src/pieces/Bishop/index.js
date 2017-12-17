import React from 'react'
import PropTypes from 'prop-types'
import enhanced from '@pieces/enhanced'
import css from './bishop.css'

/**
 * Bishop component
 * @param  {Object} props
 * @return {JSX}
 */
const Bishop = ({ side, refContainer, onTransitionEnd }) => (
  <svg
    ref={refContainer}
    onTransitionEnd={onTransitionEnd}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="45"
    height="45"
    viewBox="0 0 45 45"
    aria-labelledby="title"
  >
    <title id={`bishop-${side}`}>Bishop({side})</title>
    <g className={css.bishop}>
      <g style={{
        fill: side === 'w' ? '#ffffff' : '#000000',
        stroke: '#000000',
        strokeLinecap: 'butt'
      }}>
        <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style={{
          fill: 'none',
          stroke: side === 'w' ? '#000000' : '#ffffff',
          strokeLinejoin: 'miter'
        }} />
    </g>
  </svg>
)

Bishop.ropTypes = {
  refContainer: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  onTransitionEnd: PropTypes.func
}

Bishop.defaultProps = {
  onTransitionEnd: function () {}
}

Bishop.movement = {
  defaults: {
    diagonal: [
      [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
      [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
      [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
      [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]]
    ]
  },
  specials: []
}

export default enhanced(Bishop, 'B')
