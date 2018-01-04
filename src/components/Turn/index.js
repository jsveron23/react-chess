import React from 'react'
import PropTypes from 'prop-types'
import css from './turn.css'

/**
 * Turn component
 * @param {Object} turn
 */
const Turn = ({ isPlaying, turn }) => isPlaying ? (
  <div className={css.turn}>
    Turn: {
      turn === 'white'
        ? <span style={{ color: '#000', backgroundColor: '#fff' }}>White</span>
        : <span style={{ color: '#fff', backgroundColor: '#000' }}>Black</span>
    }
  </div>
) : null

Turn.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  turn: PropTypes.string.isRequired
}

export default Turn
