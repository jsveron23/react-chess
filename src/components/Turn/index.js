import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { merge } from '~/utils'
import css from './Turn.css'

const Turn = ({ isDoingMatch, turn }) => {
  return (
    <div className={cx(css.turn, { 'is-hidden': !isDoingMatch })}>
      <div className={cx(css.turnFloat, merge.txt('is', '-', turn))}>{turn}</div>
    </div>
  )
}

Turn.propTypes = {
  isDoingMatch: PropTypes.bool.isRequired,
  turn: PropTypes.string.isRequired
}

export default memo(Turn)
