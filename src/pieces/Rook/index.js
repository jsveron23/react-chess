import React from 'react'
import PropTypes from 'prop-types'
import enhancer from '@utils/Enhancer/piece'
import css from './rook.css'

const Rook = ({ alias, getRef, onTransitionEnd }) => (
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
    <title id={`rook-${alias}`}>Rook({alias})</title>
    <g className={css.rook} style={{ fill: alias === 'w' ? '#ffffff' : '#000000' }}>
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
          stroke: alias === 'w' ? '#000000' : '#ffffff',
          strokeWidth: 1,
          strokeLinejoin: 'miter'
        }} />
      {
        alias === 'w'
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

Rook.propTypes = {
  getRef: PropTypes.func.isRequired,
  alias: PropTypes.string.isRequired,
  onTransitionEnd: PropTypes.func
}

Rook.defaultProps = {
  onTransitionEnd: function () {}
}

Rook.movement = {
  defaults: {
    hotizontal: [
      [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]],
      [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]]
    ],

    vertical: [
      [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
      [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]]
    ]
  },
  specials: []
}

const enhancedRook = enhancer(Rook, 'R')
export default enhancedRook
