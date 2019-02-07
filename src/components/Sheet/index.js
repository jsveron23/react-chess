import React from 'react'
import PropTypes from 'prop-types'
import css from './Sheet.css'

const Sheet = ({ sheet }) => {
  return (
    <div className={css.sheet}>
      {sheet.map((item, idx) => {
        const { white, black } = item
        const key = `${idx}-${white}-${black}`

        return (
          <div key={key} className="l-flex-row">
            <span className={css.sheetIndex}>{idx + 1}</span>
            <span className={css.sheetWhite}>{white}</span>
            <span className={css.sheetBlack}>{black}</span>
          </div>
        )
      })}
    </div>
  )
}

Sheet.propTypes = {
  sheet: PropTypes.array
}

Sheet.defaultProps = {
  sheet: []
}

export default Sheet
