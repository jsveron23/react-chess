import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import css from './ScoreSheet.css'

const ScoreSheet = ({ sheet }) => {
  const len = sheet.length
  const sheetRef = useRef(null)

  useEffect(() => {
    sheetRef.current.scrollTop = 0
  })

  return (
    <ul ref={sheetRef} className={css.sheet}>
      {sheet.map((item, idx) => {
        const { white, black } = item
        const key = `${idx}-${white}-${black}`

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
  sheet: PropTypes.array
}

ScoreSheet.defaultProps = {
  sheet: []
}

export default ScoreSheet
