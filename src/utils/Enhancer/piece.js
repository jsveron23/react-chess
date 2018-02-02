import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isExist } from '@utils'

/**
 * Common API for Chess piece component
 * @param  {React.Component} WrappedComponent
 * @param  {string}          piece
 * @return {React.Component}
 */
const enhancer = (WrappedComponent, piece) => class extends PureComponent {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    translated: PropTypes.object,
    check: PropTypes.string,
    onAnimate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    onAnimateEnd: PropTypes.func
  }

  static defaultProps = {
    check: '',
    translated: {},
    onAnimateEnd: function () {}
  }

  static movement = WrappedComponent.movement

  componentDidMount () {
    const { translated, onAnimate } = this.props

    if (isExist(translated)) {
      const { axis } = translated

      onAnimate(axis, this.refElement)
    }
  }

  render () {
    const { check, alias } = this.props

    return (
      <WrappedComponent
        getRef={this.getRef}
        onTransitionEnd={this.handleTransitionEnd}
        alias={alias}
        check={check}
      />
    )
  }

  /**
   * Get ref
   * @param {Object} el
   */
  getRef = (el) => (this.refElement = el)

  /**
   * Handle animation end
   */
  handleTransitionEnd = (evt) => {
    const { translated, onAnimateEnd } = this.props

    // NOTE prevent block transition end callback firing from shaking animation
    if (isExist(translated)) {
      onAnimateEnd(piece)
    }
  }
}

export default enhancer
