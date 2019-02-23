import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose, difference } from 'ramda'
import { isExist } from '~/utils'
import css from './ScoreSheet.css'

class ScoreSheet extends Component {
  static propTypes = {
    sheet: PropTypes.array
  }

  static defaultProps = {
    sheet: []
  }

  shouldComponentUpdate (nextProps) {
    const prevProps = this.props
    const shouldUpdate = compose(
      isExist,
      difference(nextProps.sheet)
    )(prevProps.sheet)

    if (shouldUpdate) {
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
