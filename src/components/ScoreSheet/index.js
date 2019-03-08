import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { compose, difference, equals } from 'ramda'
import { isExist } from '~/utils'
import css from './ScoreSheet.css'

class ScoreSheet extends Component {
  static propTypes = {
    isDoingMatch: PropTypes.bool.isRequired,
    sheet: PropTypes.array
  }

  static defaultProps = {
    sheet: []
  }

  isSheetChanged = memoize(
    (nextSheet, prevSheet) =>
      compose(
        isExist,
        difference(nextSheet)
      )(prevSheet),
    equals
  )

  // TODO: not display correctly when undo until timeline end
  shouldComponentUpdate (nextProps) {
    const prevProps = this.props
    const { isDoingMatch, sheet } = nextProps
    const isMatchStatusChanged = prevProps.isDoingMatch !== isDoingMatch
    const isSheetChanged = this.isSheetChanged(sheet, prevProps.sheet)

    if (isMatchStatusChanged || isSheetChanged) {
      return true
    }

    return false
  }

  componentDidUpdate () {
    this.sheetRef.scrollTop = 0
  }

  render () {
    const { isDoingMatch, sheet } = this.props
    const len = sheet.length
    const cls = cx(css.sheet, {
      'is-doing-match': isDoingMatch
    })

    return (
      <ul ref={(el) => (this.sheetRef = el)} className={cls}>
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
}

export default ScoreSheet
