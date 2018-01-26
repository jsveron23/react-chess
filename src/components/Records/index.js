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

  /**
   * Get piece component
   * @param  {String}          move
   * @return {React.Component}
   */
  getPieceComponent = (move) => getPiece(move.charAt(1))

  /**
   * Get path
   * @param  {String} move
   * @return {String}
   */
  getPath = (move) => move.split(' ').map(m => m.substr(2)).join(' -> ')

  /**
   * Get ref
   * @param {HTMLElement} el
   */
  getRef = (el) => (this.recordsRef = el)

  /**
   * Lifecycle method
   */
  componentDidUpdate () {
    const { scrollHeight } = this.recordsRef

    this.recordsRef.scrollTop = scrollHeight
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { records } = this.props
    const getPath = this.getPath
    const getComponent = this.getPieceComponent

    return (
      <ul ref={this.getRef} className={css.records}>
        {
          records.map((rec, idx) => {
            const { white, black } = rec

            // white
            const wMove = white.move
            const WPiece = getComponent(wMove)

            // black
            const bMove = black && black.move
            const BPiece = bMove && getComponent(bMove)

            // path
            const wPath = getPath(wMove)
            const bPath = bMove && getPath(bMove)

            return (
              <li key={wMove || bMove} className="l-flex-row">
                <span>{idx + 1}</span>
                <span className="l-flex-middle">
                  <WPiece side="w" /> {wPath}
                </span>
                <span className="l-flex-middle">
                  {BPiece && <BPiece side="b" />} {bPath}
                </span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default Records
