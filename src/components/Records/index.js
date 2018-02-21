import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Chess from '@utils/Chess'
import css from './records.css'

class Records extends PureComponent {
  static propTypes = {
    records: PropTypes.array.isRequired
  }

  componentDidUpdate () {
    const { scrollHeight } = this.recordsRef

    this.recordsRef.scrollTop = scrollHeight
  }

  render () {
    const { records } = this.props

    // TODO
    // - single record
    // - SCU
    return (
      <ul ref={this.getRef} className={css.records}>
        {
          records.map((rec, idx) => {
            const { white, black } = rec
            const { move: wMove } = white
            const bMove = black && black.move
            const wNotation = this.getNotation(wMove)
            const bNotation = bMove && this.getNotation(bMove)

            return (
              <li key={wMove || bMove} className="l-flex-row">
                <span>{idx + 1}</span>
                <span className="l-flex-middle">
                  {wNotation}
                </span>
                <span className="l-flex-middle">
                  {bNotation}
                </span>
              </li>
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
