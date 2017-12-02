import React, { Component } from 'react'

/**
 * Common API for Chess piece
 * @param  {React.Component} WrappedComponent
 * @return {React.Component}
 */
export default function chessPieceWapper (WrappedComponent) {
  return class extends Component {
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
