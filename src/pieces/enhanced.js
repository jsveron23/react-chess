import React, { PureComponent } from 'react'

/**
 * Common API for Chess piece component
 * @param  {React.Component} WrappedComponent
 * @return {React.Component}
 * TODO https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#react-hot-loader-this-component-is-not-accepted-by-hot-loader
 */
export default function enhanced (WrappedComponent) {
  return class extends PureComponent {
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
     * Lifecycle method
     * @return {JSX}
     */
    render () {
      const { side } = this.props

      return (
        <WrappedComponent
          refContainer={this.refContainer}
          side={side}
        />
      )
    }
  }
}
