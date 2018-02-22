import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  isEmpty,
  isExist
} from '@utils'
import Chess from '@utils/Chess'
import css from './records.css'

const Record = ({ no, wNotation, bNotation }) => (
  <li className="l-flex-row">
    <span>{no}</span>
    <span className="l-flex-middle">
      {wNotation}
    </span>
    <span className="l-flex-middle">
      {bNotation}
    </span>
  </li>
)

class Records extends PureComponent {
  static propTypes = {
    records: PropTypes.array.isRequired
  }

  componentDidUpdate () {
    if (isExist(this.recordsRef)) {
      const { scrollHeight } = this.recordsRef

      this.recordsRef.scrollTop = scrollHeight
    }
  }

  render () {
    const { records } = this.props

    if (isEmpty(records)) {
      return null
    }

    // TODO
    // - SCU
    return (
      <ul ref={this.getRef} className={css.records}>
        {
          records.map((rec, idx) => {
            const { white, black } = rec
            const { move: wMove } = white
            const bMove = black && black.move

            return (
              <Record
                key={`${idx}_${wMove}_${bMove}`}
                no={idx + 1}
                wNotation={this.getNotation(wMove)}
                bNotation={bMove && this.getNotation(bMove)}
              />
            )
          })
        }
      </ul>
    )
  }

  getRef = (el) => (this.recordsRef = el)

  getNotation = (move) => {
    const { before, after } = Chess.parseMove(move)
    const who = before.substr(1, 1)
    const where = after.substr(-1) === '+'
      ? after.substr(-3)
      : after.substr(-2)
    const isCaptured = before.substr(1, 1) !== after.substr(1, 1)

    return `${who !== 'P' ? who : ''}${isCaptured ? 'x' : ''}${where}`
  }
}

export default Records
