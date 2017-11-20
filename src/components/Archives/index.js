import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Pawn, Rook, Bishop, Knight, Queen, King } from '@components'
import css from './archives.css'

class Archives extends PureComponent {
  static propTypes = {
    archives: PropTypes.array.isRequired
  }

  /**
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.pieceList = {
      P: Pawn,
      R: Rook,
      B: Bishop,
      N: Knight,
      Q: Queen,
      K: King
    }
  }

  /**
   * Get piece component
   * @param  {String}          move
   * @return {React.Component}
   */
  getPieceComponent (move) {
    return this.pieceList[move.charAt(1)]
  }

  /**
   * Get path
   * @param  {String} move
   * @return {String}
   */
  getPath (move) {
    return move.split(' ').map(m => m.substr(2)).join(' -> ')
  }

  /**
   * Get ref
   * @param {HTMLElement} el
   */
  refContainer = (el) => {
    this.archivesRef = el
  }

  /**
   * Lifecycle method
   */
  componentDidUpdate () {
    this.archivesRef.scrollTop = this.archivesRef.scrollHeight
  }

  /**
   * Lifecycle method
   * @return {JSX}
   */
  render () {
    const { archives } = this.props

    return (
      <ul ref={this.refContainer} className={css.archives}>
        {
          archives.map((achv, idx) => {
            // white always exist
            const { white, black } = achv
            const wMove = white.move.join(' ')
            const WPiece = this.getPieceComponent(wMove)
            const bMove = black && black.move.join(' ')
            const BPiece = bMove && this.getPieceComponent(bMove)
            const wPath = this.getPath(wMove)
            const bPath = bMove && this.getPath(bMove)

            return (
              <li key={idx} className="l-flex-row">
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

export default Archives
