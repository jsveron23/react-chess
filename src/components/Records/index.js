import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getPiece } from '@pieces'
import css from './records.css'

/**
 * Records component
 * @extends {React.PureComponent}
 */
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

    return (
      <ul ref={this.getRef} className={css.records}>
        {
          records.map((rec, idx) => {
            const { white, black } = rec

            // white
            const { move: wMove } = white
            const WPiece = this.getComponent(wMove)

            // black
            const bMove = black && black.move
            const BPiece = bMove && this.getComponent(bMove)

            // path
            const wPath = this.getPath(wMove)
            const bPath = bMove && this.getPath(bMove)

            return (
              <li key={wMove || bMove} className="l-flex-row">
                <span>{idx + 1}</span>
                <span className="l-flex-middle">
                  <WPiece alias="w" /> {wPath}
                </span>
                <span className="l-flex-middle">
                  {BPiece && <BPiece alias="b" />} {bPath}
                </span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  /**
   * Get piece component
   * @param  {String}          move
   * @return {React.Component}
   */
  getComponent = (move) => getPiece(move.charAt(1))

  /**
   * Get path
   * @param  {String} move
   * @return {String}
   * TODO optimize later
   */
  getPath = (move) => {
    const seperator = move.substr(4, 1)
    const path = move
      .split(seperator)
      .map(m => m.substr(2))
      .join(seperator)

    return path
  }

  /**
   * Get ref
   * @param {HTMLElement} el
   */
  getRef = (el) => (this.recordsRef = el)
}

export default Records
