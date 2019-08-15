import React, { useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { merge } from '~/utils'
import css from './ScoreSheet.css'

const ScoreSheet = ({ isDoingMatch, sheet }) => {
  const sheetRef = useRef(null)

  useEffect(() => {
    sheetRef.current.scrollTop = 0
  })

  const len = sheet.length

  return (
    <ul ref={sheetRef} className={cx(css.sheet, { 'is-doing-match': isDoingMatch })}>
      {sheet.map((item, idx) => {
        const { white, black } = item
        const key = merge.txt(idx, '-', white, '-', black)

        return (
          <li key={key} className="l-flex-row">
            <span className={css.sheetIndex}>{len - idx}</span>
            <span className={css.sheetWhite}>{white}</span>
            <span className={css.sheetBlack}>{black}</span>
          </li>
        )
      })}
    </ul>
  )
}

ScoreSheet.propTypes = {
  isDoingMatch: PropTypes.bool.isRequired,
  sheet: PropTypes.array
}

ScoreSheet.defaultProps = {
  sheet: []
}

export default memo(ScoreSheet)
