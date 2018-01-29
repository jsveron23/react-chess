import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Common API for Chess piece component
 * @param  {React.Component} WrappedComponent
 * @param  {string}          piece
 * @return {React.Component}
 */
const enhancer = (WrappedComponent, piece) => class extends PureComponent {
  static propTypes = {
    side: PropTypes.string.isRequired,
    check: PropTypes.string,
    translated: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    onAnimate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    onAnimateEnd: PropTypes.func
  }

  static defaultProps = {
    check: '',
    translated: null,
    onAnimateEnd: function () {}
  }

  static movement = WrappedComponent.movement

  componentDidMount () {
    const { translated, onAnimate } = this.props

    if (translated) {
      const { axis } = translated

      onAnimate(axis, this.refElement)
    }
  }

  render () {
    const { check, side } = this.props

    return (
      <WrappedComponent
        getRef={this.getRef}
        onTransitionEnd={this.handleTransitionEnd}
        side={side}
        check={check}
      />
    )
  }

  /**
   * Get ref
   * @param {Object} el
   */
  getRef = (el) => {
    this.refElement = el
  }

  /**
   * Handle animation end
   */
  handleTransitionEnd = () => {
    const { onAnimateEnd } = this.props

    onAnimateEnd(piece)
  }
}

export default enhancer
