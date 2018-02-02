import React from 'react'
import PropTypes from 'prop-types'
import enhancer from '@utils/Enhancer/piece'
import css from './queen.css'

/**
 * Queen component
 * @param  {Object} props
 * @return {JSX}
 */
const Queen = ({ alias, getRef, onTransitionEnd }) => (
  <svg
    ref={getRef}
    onTransitionEnd={onTransitionEnd}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="45"
    height="45"
    viewBox="0 0 45 45"
    aria-labelledby="title"
  >
    <title id={`queen-${alias}`}>Queen({alias})</title>
    <g className={css.queen} style={{ fill: alias === 'w' ? '#ffffff' : '#000000' }}>
      {
        alias === 'w'
          ? [
            <path key="wpq1" d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(-1,-1)" />,
            <path key="wpq2" d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(15.5,-5.5)" />,
            <path key="wpq3" d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(32,-1)" />,
            <path key="wpq4" d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(7,-4.5)" />,
            <path key="wpq5" d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z" transform="translate(24,-4)" />,
            <path
              key="wpq6"
              d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
              style={{ strokeLinecap: 'butt' }} />,
            <path
              key="wpq7"
              d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
              style={{ strokeLinecap: 'butt' }} />,
            <path key="wpq8" d="M 11.5,30 C 15,29 30,29 33.5,30" style={{ fill: 'none' }} />,
            <path key="wpq9" d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style={{ fill: 'none' }} />
          ]
          : [
            <g key="bpg1" style={{ fill: '#000000', stroke: 'none' }}>
              <circle cx="6" cy="12" r="2.75" />
              <circle cx="14" cy="9" r="2.75" />
              <circle cx="22.5" cy="8" r="2.75" />
              <circle cx="31" cy="9" r="2.75" />
              <circle cx="39" cy="12" r="2.75" />
            </g>,
            <path
              key="bpq2"
              d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
              style={{ strokeLinecap: 'butt', stroke: '#000000' }} />,
            <path
              key="bpq3"
              d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
              style={{ strokeLinecap: 'butt' }} />,
            <path
              key="bpq4"
              d="M 11,38.5 A 35,35 1 0 0 34,38.5"
              style={{ fill: 'none', stroke: '#000000', strokeLinecap: 'butt' }} />,
            <path
              key="bpq5"
              d="M 11,29 A 35,35 1 0 1 34,29"
              style={{ fill: 'none', stroke: '#ffffff' }} />,
            <path
              key="bpq6"
              d="M 12.5,31.5 L 32.5,31.5"
              style={{ fill: 'none', stroke: '#ffffff' }} />,
            <path
              key="bpq7"
              d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
              style={{ fill: 'none', stroke: '#ffffff' }} />,
            <path
              key="bpq8"
              d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
              style={{ fill: 'none', stroke: '#ffffff' }} />
          ]
      }
    </g>
  </svg>
)

Queen.propTypes = {
  getRef: PropTypes.func.isRequired,
  alias: PropTypes.string.isRequired,
  onTransitionEnd: PropTypes.func
}

Queen.defaultProps = {
  onTransitionEnd: function () {}
}

Queen.movement = {
  defaults: {
    horizontal: [
      [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
      [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
    ],

    vertical: [
      [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
      [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
    ],

    diagonal: [
      [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]],
      [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]],
      [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
      [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]]
    ]
  },
  specials: []
}

const enhancedQueen = enhancer(Queen, 'Q')
export default enhancedQueen
