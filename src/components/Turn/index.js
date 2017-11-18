import React from 'react'
import PropTypes from 'prop-types'
import css from './turn.css'

/**
 * Turn component
 * @param {Object} turn
 */
const Turn = ({ turn }) => (
  <div className={css.turn}>
    Turn: {
      turn === 'w'
        ? <span style={{ color: '#000', backgroundColor: '#fff' }}>White</span>
        : <span style={{ color: '#fff', backgroundColor: '#000' }}>Black</span>
    }
  </div>
)

Turn.propTypes = {
  turn: PropTypes.string.isRequired
}

export default Turn
