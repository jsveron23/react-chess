import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Common API for Chess piece component
 * @param  {React.Component} WrappedComponent
 * @param  {String}          piece
 * @return {React.Component}
 * TODO https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#react-hot-loader-this-component-is-not-accepted-by-hot-loader
 */
export default function enhanced (WrappedComponent, piece) {
  return class extends PureComponent {
    static propTypes = {
      side: PropTypes.string.isRequired,
      translated: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]),
      doAnimate: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
      ]),
      onAnimateEnd: PropTypes.func
    }

    static defaultProps = {
      translated: null,
      onAnimateEnd: function () {}
    }

    static movement = WrappedComponent.movement

    /**
     * Get ref
     * @param {Object} el
     */
    refContainer = el => {
      this.refElement = el
    }

    /**
     * Lifecycle method
     */
    componentDidMount () {
      const { translated, doAnimate } = this.props

      if (translated) {
        const { axis } = translated

        doAnimate(axis, this.refElement)
      }
    }

    /**
     * Handle animate end
     * @listens
     */
    handleTransitionEnd = () => {
      const { onAnimateEnd } = this.props

      onAnimateEnd(piece)
    }

    /**
     * Lifecycle method
     * @return {JSX}
     */
    render () {
      const { side } = this.props

      return (
        <WrappedComponent
          refContainer={this.refContainer}
          side={side}
          onTransitionEnd={this.handleTransitionEnd}
        />
      )
    }
  }
}
